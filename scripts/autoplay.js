const autoplay = function () {
    let fields = {};

    function initDomListeners() {
        $$('#auto-play-close-button').addEventListener('click', close);

        for (let wrapper of $$('.auto-play-elements-wrapper')) {
            let elements = wrapper.children;
            fields[elements[0].id] = elements[0].checked;
            elements[1].addEventListener('mousedown', checkClick, false);
            elements[0].addEventListener('mousedown', checkClick, false);
            elements[1].addEventListener('touchstart', checkClick, false);
            elements[0].addEventListener('touchstart', checkClick, false);
            if (elements.length === 4) {
                elements[2].addEventListener('input', function () {
                    elements[3].innerHTML = elements[2].value;
                });
            }
            function checkClick() {
                fields[elements[0].id] = (!elements[0].checked && elements.length === 4) ? elements[2].value : !elements[0].checked;
                update();
            }
        }

        $$('#auto-play-reset-button').addEventListener('click', function () { update(true); });
    }

    function update(reset = false) {
        for (let field in fields) {
            let elements = $$(`#${field}`).parentNode.children;
            if (reset) {
                fields[field] = false;
                elements[0].checked = false;
            }
            elements[1].style.color = fields[field] ? 'white' : '#848484';
            if (elements.length === 4) {
                elements[3].style.color = fields[field] ? 'white' : '#848484';
                elements[3].innerHTML = fields[field] ? elements[2].value : '-';
                elements[2].disabled = !fields[field];
                elements[2].style.opacity = fields[field] ? '1' : '0.5';
            }
        }
    }

    function close() {
        hideElement('#autoplay');
        $$('#game-section').classList.remove('blur');
        $$('#controls').classList.remove('blur');
    }

    window.addEventListener('load', initDomListeners, false);
}();