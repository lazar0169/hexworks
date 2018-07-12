const ui = function () {
    function toggleFullscreen() {
        if (isIos && isIphone) {
            ios.showSwiper();
        } else {
            let elem = document.documentElement;
            if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.msRequestFullscreen) {
                    elem.msRequestFullscreen();
                } else if (elem.mozRequestFullScreen) {
                    elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullscreen) {
                    elem.webkitRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }
        }
    }

    function initDomListeners() {
        $$('#fullscreen-button').addEventListener('click', toggleFullscreen);
        $$('#auto-button').addEventListener('click', function () {
            showElement('#autoplay');
            $$('#game-section').classList.add('blur');
            $$('#controls').classList.add('blur');
        });
        $$('#gamble-button').addEventListener('click', function () {
            showElement('#gamble');
        });
    }

    window.addEventListener('load', function () {
        initDomListeners();
    }, false);

    return {
        toggleFullscreen: toggleFullscreen
    };
}();