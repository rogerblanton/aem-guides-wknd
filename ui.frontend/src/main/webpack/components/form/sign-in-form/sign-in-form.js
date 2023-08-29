
(function() {
    "use strict";

    const form = document.getElementById('wknd-sign-in-form');

    if(form) {
        const urlParams = new URLSearchParams(window.location.search);
        if(urlParams && urlParams.has('j_reason') && urlParams.get('j_reason') == 'invalid_login') {
            form.querySelectorAll('[name=j_username],[name=j_password]').forEach((formItem) => {
                formItem.classList.add('cmp-form-text__text--error');
            });
            
            
        }
    }

    function handleRedirect() {
        const slingRedirectInput = document.querySelector('#wknd-sign-in-form input[name="sling.auth.redirect"]');
        if(slingRedirectInput) {
            slingRedirectInput.value = window.location.pathname;
        }
    }

    /* Add redirect to current page on the login  */
    document.body.addEventListener('wknd-modal-show', handleRedirect);
})();
