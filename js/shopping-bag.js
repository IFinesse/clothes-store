'use strict';

let items_bag = document.getElementsByClassName("item_bag");


for(let i=0; i<items_bag.length;i++) {
    items_bag[i].innerHTML = fill_item_bag(items_bag[i].id);
}

function fill_item_bag (item_bag_id) {
    for(let i = 0; i<window.catalog.length;i++) {
        if(window.catalog[i].id == item_bag_id) {
            if(window.catalog[i].hasNew == true) {
            return `
            <div class='new_item_sign'>NEW</div>
            <div class='item_bag__img'>
                <img src='${window.catalog[i].thumbnail}' alt='clothing pic'>
            </div>
            <div class='item_bag__info'>
                <h3 class='info__title'>${window.catalog[i].title}</h3>
                <h3 class='info_price'>&pound;${window.catalog[i].discountedPrice ? window.catalog[i].discountedPrice.toFixed(2) : window.catalog[i].price.toFixed(2)}</h3>
                <p class='info_color'>Color: ${window.catalog[i].colors[0]}</p>
                <p class='info_size'>Size: ${window.catalog[i].sizes[0]}</p>
                <p class='info_quantity'>Quantity: <button class='bag__change-quantity decrease'>-</button><span class='amount'>1</span><button class='bag__change-quantity increase'>+</button> </p>
                <button class='remove_item'>Remove item</button>
            </div>
            `
            } else {
                return `
                <div class='item_bag__img'>
                    <img src='${window.catalog[i].thumbnail}' alt='clothing pic'>
                </div>
                <div class='item_bag__info'>
                    <h3 class='info__title'>${window.catalog[i].title}</h3>
                    <h3 class='info_price'>&pound;${window.catalog[i].discountedPrice ? window.catalog[i].discountedPrice.toFixed(2) : window.catalog[i].price.toFixed(2)}</h3>
                    <p class='info_color'>Color: ${window.catalog[i].colors[0]}</p>
                    <p class='info_size'>Size: ${window.catalog[i].sizes[0]}</p>
                    <p class='info_quantity'>Quantity: <button class='bag__change-quantity decrease'>-</button><span class='amount'>1</span><button class='bag__change-quantity increase'>+</button> </p>
                    <button class='remove_item'>Remove item</button>
                </div>
            
                `
            }
        }
    }
}

let totalDiscount = 0;
let totalPrice = 0;
let totalQuantity = 0;


updateBag();

////calculate numbers and update page
function updateBag() {
    items_bag = document.getElementsByClassName("item_bag");

    totalDiscount = 0;
    totalPrice = 0;
    totalQuantity = items_bag.length;

    for(let i=0; i<items_bag.length;i++) {
        let amount = items_bag[i].querySelector(".amount").textContent;
        totalDiscount += getDiscount(items_bag[i].id) * Number(amount);
        totalPrice += getPrice(items_bag[i].id) * Number(amount);


        function getDiscount(item_id) {
            for(let i = 0; i<window.catalog.length;i++) {
                if(window.catalog[i].id == item_id) {
                    return window.catalog[i].price.toFixed(2) - window.catalog[i].discountedPrice;
                }
            }
        }

        function getPrice(item_id) {
            for(let i = 0; i<window.catalog.length;i++) {
                if(window.catalog[i].id == item_id) {
                    return window.catalog[i].discountedPrice.toFixed(2);
                }
            }
        }

       
    }
    let discount = document.querySelectorAll(".total__discount")[0];
    discount.innerHTML = "Applied discount: &pound;";
    discount.textContent += totalDiscount.toFixed(2);

    let price = document.querySelectorAll(".price")[0];
    price.innerHTML = "Total price: &pound;";
    price.textContent += totalPrice.toFixed(2);

    let quantity = document.querySelectorAll(".bag_quantity");
    for(let i = 0;i<quantity.length;i++) {
        quantity[i].textContent = totalQuantity;
    }

    let price_header = document.querySelectorAll(".bag_price");
    console.log(price_header.length);
    for(let i = 0;i<price_header.length;i++) {
        price_header[i].textContent = totalPrice.toFixed(2);
    }



}


let bag_container = document.querySelector(".shopping_bag__content");
bag_container.addEventListener('click', function(e) {
    if(e.target.tagName == "BUTTON") {
        if(e.target.className == "remove_item") {
            e.target.closest(".item_bag").classList.remove("item_bag");
            e.target.closest(".item_bag__wrapper").style.display = "none";
            updateBag();
        } else if (e.target.className == "bag__change-quantity decrease"){
            let n = Number(e.target.nextElementSibling.innerHTML);
            --n;
            if(n<0) n=0;
            e.target.nextElementSibling.textContent = n;
            updateBag();
        } else if (e.target.className == "bag__change-quantity increase") {
            let n = Number(e.target.previousElementSibling.innerHTML);
            e.target.previousElementSibling.textContent = ++n;
            updateBag();
        }
    }
})

let bag_panel = document.querySelector(".panel__content");
bag_panel.addEventListener('click', function(e) {
    if(e.target.tagName == "BUTTON") {
        if(e.target.className == "empty_bag") {
            let items_bag = document.getElementsByClassName("item_bag");
            console.log(items_bag.length);
            for(let i=0; i<items_bag.length;i++) {
                console.log(i);
                items_bag[i].closest(".item_bag__wrapper").style.display = "none";
                items_bag[i].classList.remove("item_bag");
                --i;
            }
            updateBag();
            bag_container.innerHTML="";
            show_message("Your shipping bag is empty. Use Catalog to add new items");         
        } else if (e.target.className == "checkout button--big") {
            let items_bag = document.getElementsByClassName("item_bag");
                console.log(items_bag.length);
                for(let i=0; i<items_bag.length;i++) {
                    console.log(i);
                    items_bag[i].closest(".item_bag__wrapper").style.display = "none";
                    items_bag[i].classList.remove("item_bag");
                    --i;
                }
                updateBag();
                bag_container.innerHTML="";
                show_message("Thank you for your purchase");
        }
    } 
})

function show_message(text) {
    let p = document.createElement('p');
    p.classList.add("bag_message");
    p.textContent = text;
    bag_container.append(p);
}