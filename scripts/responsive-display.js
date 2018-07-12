const DEFAULT_ASPECT_RATIO = 16 / 9;
let isPortrait = false;
let prevWidth;

function resizeGame() {
    let gameWindow = $$('#game-window');
    let width = window.innerWidth;
    let height = window.innerHeight;

    // this fixed problems in iOS webview controls inside the apps
    // width value is bugged when switching to landscape
    if (prevWidth) {
        if (width === prevWidth && window.orientation == 90 || window.orientation == -90) {
            width = screen.height;
        }
    }
    if (isIos) {
        prevWidth = width;
    }

    let currentAspectRatio = width / height;
    isPortrait = window.innerWidth < window.innerHeight;

    // If portrait add 'portrait' class to game window, so it can apply different styles
    isPortrait ? gameWindow.classList.add('portrait') : gameWindow.classList.remove('portrait');

    // Check orientation to see is it portrait or landscape
    currentAspectRatio > (isPortrait ? (1 / DEFAULT_ASPECT_RATIO) : DEFAULT_ASPECT_RATIO) ?
        width = Math.floor(height * (isPortrait ? (1 / DEFAULT_ASPECT_RATIO) : DEFAULT_ASPECT_RATIO)) :
        height = Math.floor(width / (isPortrait ? (1 / DEFAULT_ASPECT_RATIO) : DEFAULT_ASPECT_RATIO));

    // Add width and height to elements
    gameWindow.style.height = height + 'px';
    gameWindow.style.width = width + 'px';

    // Resize elements (dynamic css - mainly font sizes and border thickness)
    resizeLabels(width, height);

    // Trigger resized event (to update canvases dimensions mainly)
    trigger('game/resized', {
        width: width,
        height: height
    });
}

let domIcons = $$('.icon');

function resizeLabels(width, height) {
    $$('#controls').style.fontSize = isPortrait ? `${width * 0.03}px` : `${width * 0.01}px`;
    $$('#credits-value').style.fontSize = isPortrait ? `${width * 0.045}px` : `${width * 0.015}px`;
    $$('#win-value').style.fontSize = isPortrait ? `${width * 0.045}px` : `${width * 0.015}px`;
    $$('#bet-value').style.fontSize = isPortrait ? `${width * 0.045}px` : `${width * 0.015}px`;
    $$('#misc-line').style.fontSize = isPortrait ? `${width * 0.02}px` : `${width * 0.008}px`;
    $$('#ios-swipe').style.fontSize = `${width * 0.12}px`;
    $$('#loading-screen').style.fontSize = `${width * 0.05}px`;
    $$('#autoplay').style.fontSize = isPortrait ? `${width * 0.04}px` : `${width * 0.01}px`;

    // Help Screen
    $$('#help-screen').style.fontSize = isPortrait ? `${width * 0.04}px` : `${width * 0.02}px`;

    // Gamble
    $$('#gamble').style.fontSize = isPortrait ? `${width * 0.05}px` : `${width * 0.03}px`;
    $$('#gamble-info-wrapper').style.fontSize = isPortrait ? `${width * 0.03}px` : `${width * 0.015}px`;
    $$('#gamble-attempts-value').style.fontSize = isPortrait ? `${width * 0.05}px` : `${width * 0.03}px`;
    $$('#gamble-win-value').style.fontSize = isPortrait ? `${width * 0.05}px` : `${width * 0.03}px`;
    $$('#gamble-amount-value').style.fontSize = isPortrait ? `${width * 0.05}px` : `${width * 0.03}px`;


    // DOM Icons
    for (let icon of domIcons) {
        icon.style.fontSize = isPortrait ? `${width * 0.05}px` : `${width * 0.02}px`;
    }
}

window.addEventListener('resize', function () {
    setTimeout(ios.hideSwiper, 300);
    resizeGame();
}, false);

window.addEventListener('load', function () {
    resizeGame();
}, false);

window.addEventListener('orientationchange', function () {
    setTimeout(ios.hideSwiper, 300);
    resizeGame();
}, false);
