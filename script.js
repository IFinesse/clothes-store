"use strict";

let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");


let colors = ["red", "green", "blue", "yellow", "orange", "violet", "grey", "brown", "pink", "cyan", "crimson", "gold", "purple", "magenta", "indigo", "salmon", "lime", "olive", "silver", "tomato"].sort((a, b) => Math.random() - 0.5);

class Circle {
    radius = Math.floor((Math.random() * 30) + 10);
    area = this.radius *this.radius * Math.PI;
    color = colors.pop() || "green";
    posX = -this.radius;
    posY= -this.radius;
    dirX = ((Math.random()*2)+6)/10;
    dirY = 1;
}

class Square {
    width = Math.floor((Math.random() * 60) + 10);
    area = this.width * this.width;
    color = colors.pop() || "red";
    posX = -this.width;
    posY = -this.width;
    dirX = 1;
    dirY = ((Math.random()*2)+6)/10;
}


function createArray (classType) {
    let arr = [];
    for (let i = 0; i<10;i++) {
        let obj = new classType();
        arr.push(obj);
    }
    return arr;
}

let initialArray = [...createArray(Circle), ...createArray(Square)].sort(() => Math.random() - 0.5);
let activeArray = []

let number = 0;

let info = "";

let timeout5000 = setTimeout(function addNewFigure() {
    
    if (initialArray.length) {
        let currentFigure = initialArray[initialArray.length - 1];
        
        console.log(`${++number}: ${currentFigure.color}, ${currentFigure instanceof Circle? 'Circle' : 'Square'}, ${currentFigure.area}`)
        activeArray.push(initialArray.pop());
        setTimeout(addNewFigure, 5000)
    }
}
, 500);


let timeout3 = setTimeout(function drawCanvas() {

    context.clearRect(0,0, 1000, 600);
    activeArray.forEach(obj => drawFigure(obj));
    activeArray.forEach(obj => checkBorderCollision(obj))
    checkFiguresCollision(activeArray);
    info="";
    activeArray.forEach(obj => {info+= `<p class="infoItem">    ${activeArray.indexOf(obj)+1}: ${obj.dirX.toFixed(2)} ${obj.dirY.toFixed(2)} ${obj.color}, ${obj instanceof Circle? 'Circle' : 'Square'}, ${obj.area.toFixed(2)}</p>`});
    document.querySelector(".info").innerHTML = info;

    setTimeout(drawCanvas, 3);

}, 3);


function drawFigure(obj) {

    context.beginPath();
    obj instanceof Circle? context.arc(obj.posX, obj.posY, obj.radius, 0, 2*Math.PI, false) :  context.rect(obj.posX, obj.posY, obj.width, obj.width);;
    context.fillStyle = obj.color;
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.stroke();

}

function checkBorderCollision(obj) {

    let [leftSide, rightSide, top, bot] = calcCoordinatesOfFigure(obj);

    if (leftSide <= 0 && obj.dirX <0) obj.dirX = -obj.dirX;
    if (top <= 0 && obj.dirY<0) obj.dirY = -obj.dirY;
    if (rightSide >= 1000 && obj.dirX >0) obj.dirX = -obj.dirX;
    if (bot >= 600 && obj.dirY>0) obj.dirY = -obj.dirY;  

    obj.posX+=obj.dirX;
    obj.posY+=obj.dirY;

}

function calcCoordinatesOfFigure (obj) {
    //[leftSide, rightSide, top, bot];
    return obj instanceof Circle ? [obj.posX - obj.radius, obj.posX + obj.radius, obj.posY - obj.radius, obj.posY + obj.radius] : [obj.posX, obj.posX + obj.width, obj.posY, obj.posY + obj.width];
}

function checkFiguresCollision(activeArr) {
    let arr = activeArr.slice();
    for(let i = 0; i<arr.length;i++) {
        for(let j =i+1; j<arr.length;j++) {

            if (arr[i] instanceof Circle && arr[j] instanceof Circle) {
                if (calcDistanceBetweenCircles(arr[i].posX, arr[i].posY, arr[j].posX, arr[j].posY) <= arr[i].radius + arr[j].radius) {
                    changeDirection(arr[i], arr[j]);
                }

            } else if (arr[i] instanceof Square && arr[j] instanceof Square) {
                if ((arr[i].posX < arr[j].posX) && (arr[i].posY < arr[j].posY) && (((arr[j].posX + arr[j].width) - arr[i].posX) < (arr[i].width + arr[j].width)) && (((arr[j].posY + arr[j].width) - arr[i].posY) < (arr[i].width + arr[j].width)) ||
                (arr[i].posX > arr[j].posX) && (arr[i].posY < arr[j].posY) && (((arr[i].posX + arr[i].width) - arr[j].posX) < (arr[i].width + arr[j].width)) && (((arr[j].posY + arr[j].width) - arr[i].posY) < (arr[i].width + arr[j].width)) || 
                ((arr[i].posX < arr[j].posX) && (arr[i].posY > arr[j].posY) && (((arr[j].posX + arr[j].width) - arr[i].posX) < (arr[i].width + arr[j].width)) && (((arr[i].posY + arr[i].width) - arr[j].posY) < (arr[i].width + arr[j].width)) ||
                (arr[i].posX > arr[j].posX) && (arr[i].posY > arr[j].posY) && (((arr[i].posX + arr[i].width) - arr[j].posX) < (arr[i].width + arr[j].width)) && (((arr[i].posY + arr[i].width) - arr[j].posY) < (arr[i].width + arr[j].width)) 
                )) {
                    changeDirection(arr[i], arr[j]);
                } 
                
            } else if (arr[i] instanceof Circle && arr[j] instanceof Square) {
                if(checkIfCircleAndSquareCollide(arr[i], arr[j])) {
                    changeDirection(arr[i], arr[j]);
                }

            } else if(arr[i] instanceof Square && arr[j] instanceof Circle) {
                if(checkIfCircleAndSquareCollide(arr[j], arr[i])) {
                    changeDirection(arr[i], arr[j]);
                }

            } 
        }
    }
}

function calcDistanceBetweenCircles (cx1, cy1, cx2, cy2) {
    return Math.sqrt((cx1-cx2)*(cx1-cx2) + (cy1-cy2)*(cy1-cy2));
}

function checkIfCircleAndSquareCollide(circle, square) {
    let closestX = circle.posX < square.posX ? square.posX : (circle.posX > square.posX + square.width ? square.posX + square.width : circle.posX);
    let closestY = circle.posY < square.posY ? square.posY : (circle.posY > square.posY + square.width ? square.posY + square.width : circle.posY);
    let dx = closestX - circle.posX;
    let dy = closestY - circle.posY;
    return (dx*dx + dy*dy) <= circle.radius * circle.radius;
}

function changeDirection(obj1, obj2) {
    [obj1.dirX, obj2.dirX] = [obj2.dirX, obj1.dirX];
    [obj1.dirY, obj2.dirY] = [obj2.dirY, obj1.dirY];
}