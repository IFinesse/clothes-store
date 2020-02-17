"use strict";


window.onload = function start() {

    function inquireHowToShowPizzas() {
        let text = "how do you want the menu to appear on the page? please enter a number: 1 - as grid; 2 - as list";
        let choice = prompt(text);

        if(choice == 1 || choice == 2 || choice == null) {
            return choice;
        } else {
            let alternativeText = "you can choose either 1(grid) or 2(list)";
            choice = prompt(alternativeText);
            if(choice != 1 && choice != 2) {
                choice = Math.ceil(Math.random()*2);
                return choice;
            }
        }
    }

    let choice = inquireHowToShowPizzas();
   
    
    
    let namesString = ["Margarita", "Pizza Four seasons", "Vegetarian", "Munich", "Treviso", "Pepperoni", "Family", "Assorti", "Picante", "Pizza Americano", "Oriental beauty", "Hawaiian", "Quattro di Carne", "Football", "Bavarian", "Barbecue", "Mak pizza", "Meat Boom", "Pizza with meatballs", "Pizza with vegetables"];
    let ingridientsString = ["Pomodoro sauce", "Mozzarella cheese", "tomatoes", "salami", "sweet pepper", "sweet corn", "pickled onions", "olives", "greenery", "hunting sausages", "smoked chicken breast", "pork", "pickled cucumbers", "hot pepper", "ham", "bacon", "mushrooms", "french fries", "veal", "spicy pepper", "chicken", "homemade sausages", "Barbecue sauce", "chicken breast", "Pizza sauce", "meat balls", "onion", "Jalapeno peppers", "Parmesan cheese", "champignons", "Feta cheese", "pear", "arugula", "smoked salmon", "Basil sauce", "lemon"];
    ingridientsString = ingridientsString.map(str => str.toLowerCase());
    let ingridientsObj = {};

    ingridientsString.forEach((str) => {
        ingridientsObj[str] = getRandomNumber(40, 150);

    })



    let arrOfPizzas = createPizzaObjects(namesString);
    let arrOfPizzasCopy = arrOfPizzas.slice();



    let filter = document.createElement("div");
    filter.innerHTML = fillFilter();
    filter.classList.add("filter");

    let main = document.createElement("div");
    main.classList.add("main")
    let content = document.createElement("div");
    content.innerHTML = fillContent(arrOfPizzas, choice);
    content.classList.add("content");


    let select = document.createElement("select");
    select.innerHTML = "<option value='' disabled selected hidden>Sort</option><option value='nameAZ' >By name (A-Z)</option><option value='nameZA' >By name (Z-A)</option><option value ='priceCheap' >From cheap to expensive</option><option value ='priceExpensive' >From expensive to cheap</option>";
    select.classList.add("select");

    let button = document.createElement("input")
    button.setAttribute("type", "button");
    choice == 1 ? button.setAttribute("value", "switch to list") : button.setAttribute("value", "switch to grid")
    button.classList.add("button");

    main.prepend(button, content);
    document.body.append(filter, main, select);

    
    if(choice == 1) {
        select.style.visibility = "hidden";
    } else {
        filter.style.visibility = "hidden";
    }


    function createPizzaObjects (namesString) {
    
        class Pizza {
            constructor(name) {
                this._name = name;
                this.ingridients = chooseIngridients();
                this.price = 10 + this.ingridients.length;
                this.calories = calcCalories(this.ingridients) + 800 + " Cal";
            }
    
            addIngridient(obj) {
                this.ingridients.push(obj);
            }
    
        }
        function chooseIngridients() {
            let number = getRandomNumber(5, 8);
            let arr = [];
            let ings = ingridientsString.sort((a, b) => Math.random() - 0.5);
            for(let i=0;i<number;i++) {
                arr.push(ings[i]);
            }
            return arr;
        }
    
    
        let arrOfPizzas = [];
        function createPizzas() {
            for(let i = 0;i<namesString.length;i++) { 
                arrOfPizzas.push(new Pizza(namesString[i]));
            }
        }
        createPizzas();
        
        return arrOfPizzas;
    }

    function calcCalories(arr) {
        let sum = 0;
        arr.forEach((ing) => {
             sum+=ingridientsObj[`${ing}`];
        });
        return sum;
    }


    function fillFilter() {
        let filterStr = "";
        ingridientsString.forEach((str) => {
            filterStr+=  `<label><input class='input-filter' type="checkbox" >${str}</label>`
        });
        return filterStr;
    }

    function fillContent(arrayOfObjects, choice) {
        if (choice != 1 && choice != 2) choice = Math.ceil(Math.random()*2);
        if (choice == 1) return getGridHTML();
        if (choice == 2) return getListHTML();

        function getGridHTML() {
            let mainStr = "<div class='grid'>"
            arrayOfObjects.forEach(obj => {
                let arrIngs =  "";
                for(let key in obj.ingridients) {
                    arrIngs+=`<span class='ings_item' title='click to remove ingridient'>${obj.ingridients[key]}, </span>`
                }
                arrIngs = arrIngs.slice(0, -9) + arrIngs.slice(-8);
                arrIngs = arrIngs.slice(0,59) + arrIngs.slice(59,60).toUpperCase() + arrIngs.slice(60);
                mainStr+=`<div class='item--grid'>
                <img src='img/pic.png' class='pizza-img' width="300" alt="pizza pic">
                <div class='name_container'><h2 class='name'>${obj._name}</h2><img src='img/edit1.jpg' class='edit' width='24' height='24' alt='edit_pic' title='click to edit pizza'></div>
                <p class='desc'>${arrIngs}</p>
                <p class='cal'>${obj.calories}</p>
                <h2 class='price'>${obj.price} USD</h2>
            </div>`
            })
            mainStr+=`</div>`;
            return mainStr;
        }

        function getListHTML() {
            let mainStr = "<ul class='list'>";
            arrayOfObjects.forEach(obj => {
                mainStr+=`<li class='item--list'>${ obj._name}, ${obj.price} USD</li>`
            })
            mainStr+="</ul>";
            return mainStr;
        }
    }


    filter.addEventListener('click', function(e) {
        let counter = 0;
        if(e.target.tagName == "INPUT") {
            counter++;
            let selectedInputs = selectCheckedImputs();
             
            let newObjects = compareWithArrayOfPizzas(selectedInputs);
            
            content.innerHTML = "";
            content.innerHTML = fillContent(newObjects, 1);
        }
    
        function selectCheckedImputs() {
            let arr = [];
            let inputs = document.querySelectorAll(".input-filter");
            for(let input of inputs) {
                if(input.checked) {
                    arr.push(input.parentNode.textContent);
                }
            }  
            return arr; 
        }   
    
        function compareWithArrayOfPizzas(arr) {
    
            let newArr = [];
    
            if(arr.length == 0) {
                newArr = arrOfPizzas.slice();
            } else {
                for(let i = 0; i< arrOfPizzas.length;i++) {
                    for(let j = 0; j< arrOfPizzas[i].ingridients.length;j++) {
                        if (arr.includes(arrOfPizzas[i].ingridients[j])) {newArr.push(arrOfPizzas[i]);
                    }
                    }
                }
            }
    
            if (newArr == "") alert("sorry, the ingridient isn't available now");
            let set = new Set(newArr);

            newArr = Array.from(set);
            arrOfPizzasCopy = newArr;
            return newArr;
        }
    
    });



    button.addEventListener('click', function(e) {
        if(e.target.value == "switch to list") {
            button.setAttribute("value", "switch to grid");
            content.innerHTML = "";
            content.innerHTML = fillContent(arrOfPizzas, 2);
            select.style.visibility = "visible";
            filter.style.visibility = "hidden";


        } 
            else if(e.target.value == "switch to grid") {
                button.setAttribute("value", "switch to list");
                content.innerHTML = "";
                content.innerHTML = fillContent(arrOfPizzas, 1);
                filter.style.visibility = "visible";
                filter.innerHTML = fillFilter();
                select.style.visibility = "hidden";

            }
    })


    select.addEventListener('change', function(e) {
        let arr;
        switch (this.value) {
            case "nameAZ": 
            arr = arrOfPizzas.sort((a, b) => a._name > b._name ? 1 : -1);
            content.innerHTML =  fillContent(arr, 2);
            break;
            case "nameZA": 
            arr = arrOfPizzas.sort((a, b) => a._name > b._name ? -1 : 1);
            content.innerHTML =  fillContent(arr, 2);
            break;
            case "priceCheap": 
            arr = arrOfPizzas.sort((a, b) => a.price - b.price);
            content.innerHTML =  fillContent(arr, 2);
            break;
            case "priceExpensive": 
            arr = arrOfPizzas.sort((a, b) => b.price - a.price);
            content.innerHTML =  fillContent(arr, 2);
            break;
        }
        
    })

    main.addEventListener('click', function(e) {
        if(e.target.className == "ings_item"){
            let objName = e.target.closest('.item--grid').firstChild.nextElementSibling.nextElementSibling.innerText;
            let ingName = e.target.innerText.slice(0, -1).toLowerCase();

            for(let i = 0; i< arrOfPizzasCopy.length; i++) {
                if(arrOfPizzasCopy[i]._name == objName) {
                    let indexOfChosenIng = arrOfPizzasCopy[i].ingridients.indexOf(ingName);
                    arrOfPizzasCopy[i].ingridients.splice(indexOfChosenIng, 1);
                    arrOfPizzasCopy[i].calories = calcCalories(arrOfPizzasCopy[i].ingridients) + 800 +" Cal";
                    arrOfPizzasCopy[i].price--;
                    break;
                }
            }

            for(let i = 0; i< arrOfPizzas.length; i++) {
                if(arrOfPizzas[i]._name == objName) {
                    let indexOfChosenIng = arrOfPizzas[i].ingridients.indexOf(ingName);
                    arrOfPizzas[i].ingridients.splice(indexOfChosenIng, 1);
                    arrOfPizzas[i].calories = calcCalories(arrOfPizzas[i].ingridients) + 800 +" Cal";
                    arrOfPizzas[i].price--;
                    break;
                }
            }

            content.innerHTML = "";
            content.innerHTML = fillContent(arrOfPizzasCopy, 1);


        }
    })

    main.addEventListener('click', function(e) {
        if(e.target.className == "pizza-img"){
            e.target.classList.add("image-turn");
            setTimeout(() => {
                e.target.classList.remove("image-turn");
            }, 2000)

        }
    })
    

    let modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = getModal();

    let modalButton = document.createElement("input");
    modalButton.classList.add("modal_button");
    modalButton.setAttribute("type", "button");
    modalButton.setAttribute("value", "save");
    modal.append(modalButton);
    let modalCloseButton = document.createElement("div");
    modalCloseButton.classList.add("modal_close_container");
    modalCloseButton.innerHTML = "<button class='modal_close_button' >&times;</button>";
    modal.append(modalCloseButton);

    document.body.prepend(modal);


    modalCloseButton.addEventListener('click', () => {modal.style.display = "none"})


    function getModal() {
        let modalStr = "";
        ingridientsString.forEach((str) => {
            modalStr+=  `<label><input type="checkbox" class='modal_input'>${str}</label>`
        });
        return modalStr;
    }


    main.addEventListener('click', function(e) {
        if(e.target.className == "edit"){

            modal.style.display = "flex";

            let pizzaName = e.target.closest(".item--grid").firstElementChild.nextElementSibling.innerText;

            showCheckedInputs();

            function showCheckedInputs() {
                let arr = [];

                for(let i = 0; i < arrOfPizzas.length; i++) {
                    if(arrOfPizzas[i]._name == pizzaName) {
                        arr = arrOfPizzas[i].ingridients;
                    }
                }

                let inputs = document.querySelectorAll(".modal_input");
                for(let key of inputs) {
                    for(let i = 0;i< arr.length;i++) {
                        if(key.parentNode.innerText == arr[i]) {
                            console.log(key.parentNode.innerText);
                            key.checked = true;
                        }
                    }
                }

            }

            modalButton.addEventListener ('click', function() {
                let arr = [];
                let inputs = document.querySelectorAll(".modal_input");
                for(let key of inputs) {
                    if(key.checked) {
                        arr.push(key.parentNode.innerText);
                    }
                }
                if(arr.length>7) {
                    arr = arr.slice(0, 7);
                    alert("sorry, you can't choose more than 7 ingridients")
                }
                
                for(let i = 0;i<arrOfPizzasCopy.length;i++) {
                    if(arrOfPizzasCopy[i]._name == pizzaName) {
                        arrOfPizzasCopy[i].ingridients = arr;
                        arrOfPizzasCopy[i].calories = calcCalories(arr) + 800 + " Cal";
                        arrOfPizzasCopy[i].price = 10 + arr.length;
                        modal.style.display = "none";
                        content.innerHTML = fillContent(arrOfPizzasCopy, 1);

                    }
                    for(let i = 0;i<arrOfPizzas.length;i++) {
                        if(arrOfPizzas[i]._name == pizzaName) {
                            arrOfPizzas[i].ingridients = arr;
                            arrOfPizzas[i].calories = calcCalories(arr) + 800 + " Cal";
                            arrOfPizzas[i].price = 10 + arr.length;
                        }
                   }   
                }
            })
            
        }
    })
}

    function getRandomNumber(from, to) {
        return Math.floor(Math.random() * (to - from)) + from;
    }