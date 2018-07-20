const sidebar = (function () {
    let listMenu = get('.list-management');
    let backMenu = get('#selected-back');
    let expandMenu = get('#sidebar-expand');
    let menu = get('#sidebar');
    let menuLink = get('#menu-links');
    let generalSearch = get('#global-search');
    let chosenLink = get('#clicked-link');
    let chosenWrapper = get('#show-link');
    let linkWrapper = get('#chosen-list');
    let linkList = get('.link-list');
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
        generalSearch.style.visibility = 'hidden';
        backMenu.style.visibility = 'visible';
        menuLink.classList.add('hide');
        chosenWrapper.classList.add('show');
        chosenLink.dataset.id = linkId.id;
        chosenLink.innerHTML = linkText;
        menuLink.classList.remove('show');
        chosenWrapper.classList.remove('hide');

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
        menuLink.classList.add('show');
        chosenWrapper.classList.add('hide');
        menuLink.classList.remove('hide');
        chosenWrapper.classList.remove('show');
        generalSearch.style.visibility = 'visible';
        backMenu.style.visibility = 'hidden';
    }
    function autocomplete(inp, data) {


    };
})();