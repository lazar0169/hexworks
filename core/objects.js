const objects = function () {
    function init() {
        for (let object of $$('object')) {
            let objectName = object.dataset.object;
            let fragment = document.createRange().createContextualFragment(externalObjects[objectName]);
            object.parentNode.insertBefore(fragment, object.nextSibling);
        }
        clear();
    }

    function clear() {
        let objectsList = $$('object');
        if (objectsList.length === 0) return;
        objectsList[0].remove();
        clear();
    }

    init();
}();