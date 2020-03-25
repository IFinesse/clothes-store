"use strict";


///expand search field in tablet mode

let icon = document.getElementById("search_icon");
let search_input = document.getElementsByClassName("search_input")[0];

icon.addEventListener('click', function() {
    if(document.getElementById("search_input").style.display == false) {
        search_input.classList.toggle("search_input--active");
        search_input.focus();
    }
})


/////switch menu in mobile mode

let open_menu = document.querySelector(".open_menu");
let close_menu = document.querySelector(".close_menu");
let mobile_menu = document.getElementsByClassName("mobile_menu")[0];
let main = document.querySelector(".main");
let footer = document.querySelector(".footer");

open_menu.addEventListener('click', switch_menu);
close_menu.addEventListener('click', switch_menu);

function switch_menu () {
    mobile_menu.classList.toggle("show");
    main.classList.toggle("hide");
    footer.classList.toggle("hide");
    open_menu.classList.toggle("hide");
    close_menu.classList.toggle("hide");

    if (close_menu.className == "close_menu") {
        document.querySelector(".header--mobile__menu_button").style.borderLeft = "none";
    };
}





//fill usual items in all modes

let items = document.getElementsByClassName("item");

for(let i=0; i<items.length;i++) {
    items[i].innerHTML = fill_item(items[i].id);
}


function fill_item (item_id) {
    for(let i = 0; i<window.catalog.length;i++) {
        if(window.catalog[i].id == item_id) {
            if(window.catalog[i].hasNew == true) {
            return `<a href='./item.html'><div class='new_item_sign'>NEW</div>
            <div class='view_item_sign'>View item</div>
            <img src='${window.catalog[i].thumbnail}' alt='clothing pic'>
                                <h3 class='item_title'>${window.catalog[i].title}</h3>
                                <p class='item_price'>&pound;${window.catalog[i].price.toFixed(2)}</p>
                                </a>`
            } else {
                return `<a href='./item.html'>
                <img src='${window.catalog[i].thumbnail}' alt='clothing pic'>
                <div class='view_item_sign'>View item</div>
                <h3 class='item_title'>${window.catalog[i].title}</h3>
                <p class='item_price'>&pound;${window.catalog[i].price.toFixed(2)}</p>
                </a>`
            }
        }
    }
}



