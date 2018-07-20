const sidebar = (function () {
    let listMenu = get('.list-management');
    let backMenu = get('#selected-back');
    let expandMenu = get('#sidebar-expand');
    let menu = get('#sidebar');
    let menuLink = get('#menu-links');
    let generalSearch = get('#global-search');
    let chosenLink = get('#clicked-link');
    let linkWrapper = get('#chosen-list');
    let linkList = get('.link-list');
    let menuChosen = get('#sidebar-chosen');
    let arrayList = Object.keys(data);

    window.addEventListener('load', () => {
        makeMenu();
    });
    expandMenu.addEventListener('click', () => {
        expand();
    });
    backMenu.addEventListener('click', () => {
        backToList();
    });

    function makeMenu() {
        for (let count of arrayList) {
            menuLink.innerHTML += `<li class="list-management" data-id="${count}">${count}</li>`
        }
        for (let list of listMenu) {
            if (!list.id) {
                list.addEventListener('click', () => {
                    chosenList(list.dataset, list.textContent);
                })
            }
        }
    };

    function expand() {
        if (isExpand) {
            menu.classList.add('expand');
            expandMenu.value = ">";
            isExpand = false;
        }
        else {
            menu.classList.remove('expand');
            expandMenu.value = "<";
            isExpand = true;
        }
    };

    function chosenList(linkId, linkText) {
        linkWrapper.innerHTML = '';
        menu.classList.add('hide');
        menuChosen.classList.add('show');
        menu.classList.remove('show');
        menuChosen.classList.remove('hide');
        chosenLink.dataset.id = linkId.id;
        chosenLink.innerHTML = linkText;

        linkWrapper.innerHTML = `<a class="link-list" data-id="all}">All for ${chosenLink.textContent}</a>`
        for (let count of data[linkId.id]) {
            linkWrapper.innerHTML += `<a class="link-list" data-id="${count.id}">${count.name}</a>`
        }
        for (let link of linkList) {
            link.addEventListener('click', () => {
                alert(`ja imam id = ${link.dataset.id}, i trebam prikazati tabelu za ${link.textContent}`);
            })
        }
    };

    function backToList() {
        menu.classList.add('show');
        menuChosen.classList.add('hide');
        menu.classList.remove('hide');
        menuChosen.classList.remove('show');
    }
    function autocomplete(inp, data) {


    };
})();