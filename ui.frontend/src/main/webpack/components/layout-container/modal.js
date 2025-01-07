import jQuery from "jquery";

jQuery(function($) {
    "use strict";

    let visible = false;

    function fadeInEffect(target, callback) {
        conos
        var fadeTarget = target;
        var fadeEffect = setInterval(function () {
            console.log(fadeTarget.style.opacity);
            if (!fadeEffect.style.opacity) {
                fadeEffect.style.opacity = 1;
            }
            if (fadeTarget.style.opacity < 100) {
                fadeTarget.style.opacity += 0.1;
            } else {
                clearInterval(fadeEffect);
            }
        }, 200);
        callback();
    }

    function fadeOutEffect(target, callback) {
        var fadeTarget = target;
        var fadeEffect = setInterval(function () {
            if (!fadeTarget.style) {
                fadeTarget.style.opacity = 1;
            }
            if (fadeTarget.style.opacity > 0) {
                fadeTarget.style.opacity -= 0.1;
            } else {
                clearInterval(fadeEffect);
            }
        }, 200);
        callback();
    }

    /**
     * Handle clicking of the Sign In button
     */
    $('body').on('click', '[data-modal-url]', showModal);


    /**
     * Handle clicking "off-modal" to hide it
     */
    $(document).on('click', (hideModal));


    function showModal(e) {
        e.preventDefault();

        const xfUrl = $(this).data('modal-url');

        if (visible || !xfUrl) { return; }
        const showModalEvt = new Event('wknd-modal-show');
        const body = document.querySelector('body');

        $.get(xfUrl, function (data) {
            let modal = document.createElement("div");

            modal.id = "wknd-modal"
            document.body.appendChild(modal);
            modal.innerHTML = data;

            fadeInEffect(modal, function() {
                visible = true;    
            })

            visible = true;
            // dispatch event to indicate that the modal has been shown
            // used by sign-in-form.js to dynamically update a successful sign-in redirect to the current page
            body.dispatchEvent(showModalEvt);
        });

        return false;
    }

    function hideModal(e) {
        const modal = document.getElementById('wknd-modal');
        console.log('in hide modal', e.target, modal.contains(e.target));

        // if the target of the click isn't the modal nor a descendant of the modal
        if (visible && modal && !modal.contains(e.target)) {
            e.preventDefault();
            fadeOutEffect(modal,function() {
                modal.remove;
            });
            visible=false;

            return false;
        }

    }
});
