var c;
var context; 
function relMouseCoords(event){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do{
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {x:canvasX, y:canvasY}
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;


var horzSpeed = 10;

var clickedLocation = 0;

var playerLoc = {x: 1000, y: 1000}
var points = [];
var accuracy = 10;

$(document).ready(function(){
    c = document.getElementById("mainCanvas");
    context = c.getContext("2d");
    $("#mainCanvas").click(function(ev){
        clickedLocation = this.relMouseCoords(ev).x * 4;

        drawLine();
    });
});

function drawLine(){
    context = c.getContext("2d");
    context.clearRect(0, 0, 2000, 2000);
    context.beginPath();
    context.moveTo(1000.5, 1000);

    var goTo = clickedLocation;
    var current = Object.assign({}, playerLoc);
    var increment = (goTo - playerLoc.x) / accuracy;
    var time = Math.abs(goTo - playerLoc.x) / horzSpeed;

    // time / 2 is when vert velocity must = 0

    var intialVelocity = -9.81 * (time / 2);
    var incrementTime = time / accuracy;

    // 0 = vi + a*t
    // vi = - a*t

    for(var i = 1; i < accuracy; i++){
        current.x += increment;
        current.y += intialVelocity - (-9.81 * incrementTime * i);
        context.lineTo(current.x, current.y);
        context.stroke();
    }
    clickedLocation * 4 < 1000 ? numberthing = -1 : numberthing = 1;
    context.lineWidth = 10;
    // context.lineTo(this.relMouseCoords(ev).x * 4, 1000); //this.relMouseCoords(ev).y * 4
    context.stroke();
}
function changeHorzSpeed(value){
    horzSpeed = value;
    document.getElementById("test").innerHTML = horzSpeed;
    drawLine();
}