const sidebar = (function () {
    let arrayList = Object.keys(data);
    let menu = get('#sidebar');
    let sidebarHeader = get('#sidebar-top');
    let linkWrapper = get('#sidebar-middle');
    let listMenu = get('.list-management');
    let expandButton = get('#icon-expand');
    let navigation = get('#sidebar-navigation')
    let back = get('#back-button');
    let chosenLink = get('#chosen-link');
    let listWrapper = get('#navigation-content');
    let linkList = get('.link-list');
    let globalSearch = get('#icon-search');
    let globalList = get('.lists');
    let logoWrapper = get('#sidebar-bottom');



    window.addEventListener('load', () => {
        makeMenu();
    });
    expandButton.addEventListener('click', () => {
        expand();
    });

    back.addEventListener('click', () => {
        navigation.classList.remove('expand');

    });

    globalSearch.addEventListener('click', () => {
        chosenLink.innerHTML = "Search";
        makeLinks();
        navigation.classList.add('expand');

    });

    function makeMenu() {
        for (let count of arrayList) {
            linkWrapper.innerHTML += `<li class="list-management" data-id="${count}">${count}</li>`
        }
        for (let list of listMenu) {
            list.addEventListener('click', () => {
                chosenLink.dataset.id = list.dataset.id;
                chosenLink.innerHTML = list.textContent;
                makeLinks(list.dataset.id);
                navigation.classList.add('expand');
            })
        }
    };
    function expand() {
        if (isExpand) {
            menu.classList.add('expand');
            sidebarHeader.classList.add('expand');
            logoWrapper.classList.add('expand')
            isExpand = false;
        }
        else {
            menu.classList.remove('expand');
            sidebarHeader.classList.remove('expand');
            logoWrapper.classList.remove('expand');
            isExpand = true;
        }

    };

    function makeLinks(id) {
        listWrapper.innerHTML = '';
        if (id) {
            for (let count of data[id]) {
                listWrapper.innerHTML += `<a class="link-list" data-id="${count.id}">${count.name}</a>`
            }

        }
        else {
            for (let list of arrayList) {
                listWrapper.innerHTML += `<ul class="lists" data-id=${list}><h3>${list}</h3></ul>`
            }
            for (let list in arrayList) {
                for (let count of data[arrayList[list]]) {
                    globalList[list].innerHTML += `<a class="link-list" data-id="${count.id}">${count.name}</a>`
                }
            }
        }
        for (let link of linkList) {
            link.addEventListener('click', () => {
                alert(`ja imam id = ${link.dataset.id}, i trebam prikazati tabelu za ${link.textContent} i da vratim menu`);
                navigation.classList.remove('expand');
            })
        }
    };

})();
