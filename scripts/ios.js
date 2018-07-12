const ios = function () {
    if (isIos) {
        // Prevent double tap to zoom by programaticly clicking element on touchend
        document.addEventListener('touchend', function (e) {
            e.preventDefault();
            e.target.click();
        }, { passive: false });

        // Prevent scrolling on safari browser
        if (isSafari) {
            let prevTouchY = 0;
            document.addEventListener('touchmove', function (event) {
                let scrollingUp = event.pageY > prevTouchY;
                if (elementsVisible['#autoplay'])
                    canScroll = event.target.type === 'range';
                if (helpScreen.visible)
                    canScroll = !(helpScreen.bottomReached && !scrollingUp);
                if (event.touches.length > 1 || !canScroll)
                    event.preventDefault();
            }, { passive: false });
        }

        // If the device is iPad, fix game-window position
        if (!isIphone) {
            $$('#game-window').style.position = 'absolute';
            $$('#game-window').style.top = 'auto';
            $$('#game-window').style.bottom = 'auto';
        }
    }

    return {
        showSwiper: function () {
            $$('#ios-swipe').style.height = `${(window.orientation == 90 || window.orientation == -90) ? screen.width : screen.height}px`;
            canScroll = true;
            showElement('#ios-swipe');
        },
        hideSwiper: function () {
            canScroll = false;
            hideElement('#ios-swipe');

        }
    };
}(); 