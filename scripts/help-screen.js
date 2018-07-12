const helpScreen = function () {
    let maxCol = false;
    let maxColPortrait = false;
    let helpVisible = false;
    let helpScreenBottomReached = false;
    let mouseDown = false;
    let helpScreenScrollableWrapper = $$('#help-screen-scrollable-wrapper');
    let infoButton = $$('#info-button');

    function resizeHelpScreens(width, height) {
        if (isIos)
            helpScreenScrollableWrapper.style.width = '100%';
        checkScroll();
    }

    function checkScroll() {
        if (isPortrait) {
            hideElement('#scrollbar');
            $$('#close-help-screen').classList.add('button');
            $$('#close-help-screen').style.pointerEvents = 'all';
        } else {
            showElement('#scrollbar');
            $$('#close-help-screen').classList.remove('button');
            $$('#close-help-screen').style.pointerEvents = 'none';
        }
    }

    function addSymbolValues() {
        for (let i in helpScreenValues) {
            try {
                $$(`#${i}`).innerHTML = helpScreenValues[i];
            } catch (error) { }
        }
    }

    infoButton.addEventListener('click', function () {
        addSymbolValues();
        showElement('#help-screen');
        $$('#game-section').classList.add('blur');
        $$('#controls').classList.add('blur');
        checkScroll();
        addScrollBar();
        resizeHelpScreens();
        on('game/resized', function (event, data) {
            resizeHelpScreens(data.width, data.height);
        });
        helpVisible = true;
    });

    $$('#close-help-screen').addEventListener('click', closeHelpScreen);

    $$('#help-content').addEventListener('mousedown', function (event) {
        event.stopPropagation();
    });
    $$('#help-content').addEventListener('touchstart', function (event) {
        event.stopPropagation();
    });

    helpScreenScrollableWrapper.addEventListener('mousedown', closeHelpScreen);
    helpScreenScrollableWrapper.addEventListener('touchstart', closeHelpScreen);
    document.onkeydown = function (e) {
        switch (e.which) {
            case 27:
                closeHelpScreen();
                break;
        }
    };

    let mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? 'DOMMouseScroll' : 'mousewheel';

    function closeHelpScreen() {
        helpVisible = false;
        hideElement('#help-screen');
        $$('#game-section').classList.remove('blur');
        $$('#controls').classList.remove('blur');
        helpScreenScrollableWrapper.scrollTop = 0;
        $$('#scroll').style.top = '0px';
        helpScreenBottomReached = false;
    }

    function checkHelpScreen() {
        helpScreenBottomReached = helpScreenScrollableWrapper.scrollTop >= (helpScreenScrollableWrapper.scrollHeight - helpScreenScrollableWrapper.offsetHeight);
    }

    function addScrollBar() {
        let scrollbar = $$('#scrollbar');
        let scrollThumb = $$('#scroll');
        let helpScreen = $$('#help-screen-scrollable-wrapper');
        let scrollStarted = false;
        let startPoint = 0;
        let topPos = 0;
        let thumbHeight = (scrollThumb.offsetHeight * 100) / scrollbar.offsetHeight;
        let maxThumbScroll = scrollbar.offsetHeight * (1 - (thumbHeight / 100));
        let maxHeight = helpScreen.scrollHeight - helpScreen.offsetHeight;
        if (isAndroid || isIos) {
            scrollbar.style.width = '0.3%';
            scrollbar.style.right = '12.2%';
            scrollbar.style.background = 'rgba(169, 169, 169, 0.24)';
            scrollThumb.style.background = '#dedede';
            scrollbar.style.pointerEvents = 'none';
        }

        on('game/resized', function (event, data) {
            thumbHeight = (scrollThumb.offsetHeight * 100) / scrollbar.offsetHeight;
            maxThumbScroll = scrollbar.offsetHeight * (1 - (thumbHeight / 100));
            maxHeight = helpScreen.scrollHeight - helpScreen.offsetHeight;
        });

        scrollbar.addEventListener('mousedown', function (event) {
            event.stopPropagation();
            scrollStarted = true;
            startPoint = event.pageY;
            topPos = scrollThumb.style.top.replace('px', '') === '' ? 0 : parseFloat(scrollThumb.style.top.replace('px', ''));
            mouseDown = true;
            scrollThumb.classList.add('active');
        }, false);

        scrollThumb.addEventListener('mouseover', function () {
            scrollThumb.classList.add('active');
        }, false);

        scrollThumb.addEventListener('mouseleave', function () {
            if (!mouseDown)
                scrollThumb.classList.remove('active');
        }, false);

        let mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? 'wheel' : 'mousewheel';
        scrollbar.addEventListener(mousewheelevt, function (event) {
            topPos = scrollThumb.style.top.replace('px', '') === '' ? 0 : parseFloat(scrollThumb.style.top.replace('px', ''));
            scroll(mousewheelevt === 'mousewheel' ? event.deltaY / 5 : event.deltaY * 4);
        }, false);

        document.addEventListener('mouseup', function (event) {
            event.stopPropagation();
            scrollStarted = false;
            mouseDown = false;
            scrollThumb.classList.remove('active');
        }, false);

        document.addEventListener('mousemove', function (event) {
            event.stopPropagation();
            if (scrollStarted) {
                scroll(event.pageY - startPoint);
            }
        }, false);

        scrollbar.addEventListener('touchstart', function (event) { event.stopPropagation(); }, false);

        helpScreen.addEventListener('scroll', function (event) {
            if (scrollStarted) return;
            $$('#scroll').style.top = `${(((helpScreen.scrollTop * 75) / maxHeight) * scrollbar.offsetHeight) / 100}px`;
        });

        function scroll(position) {
            let scrollPosition = topPos + position;
            if (scrollPosition >= 0 && scrollPosition <= maxThumbScroll) {
                scrollThumb.style.top = `${scrollPosition}px`;
            } else if (scrollPosition >= maxThumbScroll) {
                scrollThumb.style.top = `${maxThumbScroll}px`;
                helpScreenBottomReached = true;
            } else {
                scrollThumb.style.top = '0px';
            }
            helpScreen.scrollTop = (maxHeight * scrollPosition) / (maxThumbScroll);
        }
    }

    helpScreenScrollableWrapper.addEventListener(mousewheelevt, checkHelpScreen);
    helpScreenScrollableWrapper.addEventListener('scroll', checkHelpScreen);

    return {
        get visible() {
            return helpVisible;
        },
        get bottomReached() {
            return helpScreenBottomReached;
        }
    };
}();
