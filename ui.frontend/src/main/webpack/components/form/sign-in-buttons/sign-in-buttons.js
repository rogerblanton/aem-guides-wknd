(function() {

    "use strict";

    const httpRequest = new XMLHttpRequest(),
        currentUserUrl = document.querySelector('.wknd-sign-in-buttons').dataset.currentUserUrl;

    function handleUserDetails(currentUser) {

        const isAnonymous = 'anonymous' === currentUser.authorizableId,            
            signIn = document.querySelector('[href="#sign-in"]'),
            signOut = document.querySelector('[href="#sign-out"]'),                            
            body = document.body;

        let greetingLabel = document.getElementById('wkndGreetingLabel'),
            greetingText = greetingLabel.innerText;

        if(isAnonymous) {
            signIn.style.display = 'inline-block';
            body.classList.add('anonymous');
        } else {
            signOut.style.display = 'inline-block';
            greetingLabel.innerHTML = greetingText + ", " + currentUser.name;
            greetingLabel.style.display = 'inline-block';
        }
    }

    function handler() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                handleUserDetails(JSON.parse(httpRequest.responseText));
            } else {
                alert("There was a problem with the request.");
            }
        }
    }
        
    httpRequest.onreadystatechange = handler;

    httpRequest.open("GET", currentUserUrl + "?nocache=" + new Date().getTime(), true);
    httpRequest.send();

        
})();