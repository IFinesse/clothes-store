"use strict";

let inquiry = "how do you want the menu to appear on the page? please enter a number: 1 - as grid; 2 - as list";
    let choice = prompt(inquiry);

window.onload = function start() {
    // if (arguments[0]) choice = arguments[0];

    // let filter = document.createElement("div");
    // document.body.prepend(filter);
    // filter.classList.add("filter");
    let filter = document.createElement("div");
    let main = document.createElement("div");

    let select = document.createElement("select");
        select.classList.add("select");
        // select.setAttribute("onchange(handler())");
        // function handler()
        select.innerHTML = "<option value='name' >By name</option><option value ='price' >By price</option>";

    let filterStr = "";


    filter.classList.add("filter");
    main.classList.add("main");


    
    let namesString = ["Margarita", "Pizza Four seasons", "Vegetarian", "Munich", "Treviso", "Pepperoni", "Family", "Assorti", "Picante", "Pizza Americano", "Oriental beauty", "Hawaiian", "Quattro di Carne", "Football", "Bavarian", "Barbecue", "Mak pizza", "Meat Boom", "Pizza with meatballs", "Pizza with vegetables"];
    // let ingridientsString = ["Pomodoro sauce", "Mozzarella cheese", "tomatoes", "1", "2", "3", "4", "5"];
    let ingridientsString = ["Pomodoro sauce", "Mozzarella cheese", "tomatoes", "salami", "sweet pepper", "sweet corn", "pickled onions", "olives", "greenery", "hunting sausages", "smoked chicken breast", "pork", "pickled cucumbers", "hot pepper", "ham", "bacon", "mushrooms", "french fries", "veal", "spicy pepper", "chicken", "homemade sausages", "Barbecue sauce", "chicken breast", "Pizza sauce", "meat balls", "onion", "Jalapeno peppers", "Parmesan cheese", "champignons", "Feta cheese", "parmesan cheese", "pear", "arugula", "smoked salmon", "Basil sauce", "lemon"];
    ingridientsString = ingridientsString.map(str => str.toLowerCase());
    let ingridientsObj = {};
    // let namesString = ["Margarita", "Pizza Four seasons"];

    ingridientsString.forEach((str) => {
        ingridientsObj[str] = getRandomNumber(40, 150);

    })

    // console.log(ingridientsObj);
    let arrOfPizzas;
    let page;
    
    if (choice == 1 || choice == 2 || choice == null) {

        arrOfPizzas = createPizzaObjects(namesString);
        page = createHTML(arrOfPizzas, choice);
        renderPage(page, choice);
        // console.log("ok")
    } else {
        inquiry = "you can choose either 1(grid) or 2(list)";
        choice = prompt(inquiry);
        start();
    }



    function createPizzaObjects (namesString) {

    


        // let pizzaQuantity = 20;
    
        class Pizza {
            constructor(name, price) {
                this._name = name;
                this.ingridients = chooseIngridients();
                this.price = price + " USD";
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
            // console.log(ings);
            for(let i=0;i<number;i++) {
                arr.push(ings[i]);
            }
            return arr;
        }
    
        function calcCalories(arr) {
                let sum = 0;
                arr.forEach((ing) => {
                     sum+=ingridientsObj[`${ing}`];
                });
                return sum;
        }
    
        
        // class Ingridient {
        //     constructor (name, calories) {
        //         this._name = name;
        //         this._calories = calories;
        //     }
        // }
        let arrOfPizzas = [];
        function createPizzas() {
            for(let i = 0;i<namesString.length;i++) {
                arrOfPizzas.push(new Pizza(namesString[i], getRandomNumber(10, 30)));
            }
            // console.log(arrOfPizzas);
        }
        createPizzas();
        
        return arrOfPizzas;
    
    
    }


    function createHTML(arr, choice) {
        let str = "";
        let main;
        if (choice == null) choice = Math.ceil(Math.random()*2);
        if (choice == 1) {
            str = "<input type='button' class='button' value='switch to list'><div class='grid'>";
            // createFilter();
            main = createGrid();
        }
        if (choice == 2) {
            str = "<div class='list'><input type='button' class='button' value='switch to grid'>";
            main = createList();
        }
        

        function createGrid() {
            // let strFilter = "<div class='filter'>";

            // let gridString = createFilterSidebar() + createMainGrid();
            if(filterStr == "") {
                createFilterSidebar();
                // console.log(filterStr);

            }
            // createFilterSidebar()
            let mainStr = createMainGrid();
            

            function createFilterSidebar () {
                // let strFilter = "<div class='filter'>";
                // let strFilter = "";
                let i = 1;
                ingridientsString.forEach((str) => {
                    filterStr+=  `<label><input type="checkbox" >${str}</label>`
                    i++;
                })
                // strFilter+="<div>";
                // return strFilter;
                document.body.append(filter);
        // filter.innerHTML = "";

        filter.innerHTML = filterStr;

            }
            
            // strFilter+="<div>"
    
        //    filter.insertAdjacentHTML('afterbegin', strFilter);
            function createMainGrid() {
                arr.forEach(obj => {
                    str+=`<div class='item--grid'>
                    <img src='img/pic.png' width="300" alt="pizza pic">
                    <h2 class='name'>${obj._name}</h2>
                    <p class='desc'>${obj.ingridients.join(", ")}</p>
                    <p class='cal'>${obj.calories}</p>
                    <h2 class='price'>${obj.price}</h2>
                </div>`
                })
                str+=`</div>`;
                return str;
            }






            
            
            
            
            
            
            
            
            // return gridString;
            return mainStr;
            
            // main.innerHTML = str;
        }
        // console.log(arr);
        
        
        function createList() {
            
            
            str+="<ul class='list'>"
            arr.forEach(obj => {
                str+=`<li class='list--item'>${ obj._name}, ${obj.price}</li>`
            })
            str+="</ul>"
        document.body.prepend(select);

            return str;
        }


        return main;

    }

    

    
    function renderPage(str, choice) {
        // if(choice == "2") {
            
        // }
        // console.log(str);


        let mainStr = str;
        // console.log(filterStr);

        

        document.body.append(main);
        main.innerHTML = "";

        main.innerHTML = mainStr;

    }

    
    // let s = document.querySelector(".select");
    // s.addEventListener('click', function(e) {
    //     if(e.target.tagName =="OPTION") {
    //         if(e.target.value == "name") {
    //             sortByName();
    //         } else {
            
    //         }
    //         // console.log(e.target.value);
    //         // console.log("22");
    //     }
    //         // console.log("22");

    // //    let options = document.querySelectorAll("option");
       
    // })
// if (document.querySelector(".filter")) {


    document.querySelector(".filter").addEventListener('click', function(e) {
        if(e.target.tagName == "INPUT") {
    
            let selectedInputs = selectCheckedImputs();
            let newObjects = compareWithArrayOfPizzas(selectedInputs);
            // console.log(newObjects);
            let page = createHTML(newObjects, 1);
            renderPage(page);
        }
    
        function selectCheckedImputs() {
            let arr = [];
            let inputs = document.querySelectorAll("input");
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
                newArr = arrOfPizzas;
            } else {
                for(let i = 0; i< arrOfPizzas.length;i++) {
                    for(let j = 0; j< arrOfPizzas[i].ingridients.length;j++) {
                        if (arr.includes(arrOfPizzas[i].ingridients[j])) {newArr.push(arrOfPizzas[i]);
                        // console.log(arrOfPizzas[i]);
                    }
                    }
                }
            }
    
            if (newArr == "") alert("sorry, the ingridient isn't available now");
            let set = new Set(newArr);
            return Array.from(set);
        }
    
    });

    let but = document.querySelector(".button");
    but.addEventListener('click', function(e) {
        if(e.target.value == "switch to list") {
            document.body.innerHTML = "";
            page = createHTML(arrOfPizzas, 2);
            renderPage(page, 2);
        }
        if(e.target.value == "switch to grid") {
            document.body.innerHTML = "";
            page = createHTML(arrOfPizzas, 1);
            renderPage(page, 1);
        }
    })
}


    
// }

    function getRandomNumber(from, to) {
        return Math.floor(Math.random() * (to - from)) + from;
    }
