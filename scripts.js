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


var horzSpeed = 50;

var clickedLocation = 0;

var playerLoc = {x: 1000, y: 1000}
var points = [];
var accuracy = 1000;

$(document).ready(function(){
    c = document.getElementById("mainCanvas");
    context = c.getContext("2d");

    context.beginPath();
    context.moveTo(0, 1000);
    context.lineTo(2000.5, 1000);
    context.lineWidth = 20;

    context.moveTo(1000, 2000);
    context.lineTo(1000, 0);

    context.font = "50px Arial";
    context.fillText("0", 0, 1080);
    context.fillText("2000", 1880, 1080);
    context.stroke();

    $("#mainCanvas").click(function(ev){
        clickedLocation = this.relMouseCoords(ev).x * 4;

        drawLine();
    });
});

function drawLine(){
    $("#horzSpeedSlider").attr('disabled', true);
    context = c.getContext("2d");
    context.clearRect(1010, 0, 2000, 990);
    context.beginPath();
    context.moveTo(1000.5, 1000);

    var goTo = clickedLocation;
    // goTo = 1500;
    var current = Object.assign({}, playerLoc);
    var increment = (goTo - playerLoc.x) / accuracy;
    console.log(`The object is travelling ${Math.abs(goTo - playerLoc.x)}m`);
    console.log(`The horizontal velocity of the object is ${horzSpeed}ms⁻¹ or ${horzSpeed * 3.6}kmh⁻¹`);
    console.log(`The horizontal increment per unit of accuracy is ${increment}m per iteration`);

    var time = Math.abs(goTo - playerLoc.x) / horzSpeed;
    var targetTime = new Date(new Date().getTime() + time * 1000);
    console.log(`It will take ${time}s to reach the targetted location`);
    $("#secondtoground").text(time);

    for(var i = 1; i <= time * 1000; i++){
        setTimeout(function(){
            var time = (targetTime - new Date().getTime()) / 1000;
            if(time < 0){
                time = 0;
            }
            $("#secondtoground").text(time);
        }, i);

    }

    // time / 2 is when vert velocity must = 0

    var intialVelocity = -9.81 * (time / 2);
    console.log(`The initial vertical velocity is ${-intialVelocity}ms⁻¹`);

    var incrementTime = time / accuracy;
    console.log(`The increment of time per unit of accuracy is ${incrementTime}s per iteration`);

    // 0 = vi + a*t
    // vi = - a*t

    path = [];
    for(var i = 1; i < accuracy; i++){
        current.x += increment;
        current.y += ((intialVelocity) - (-9.81 * incrementTime * i)) * time / accuracy;
        path.push([current.x, current.y]);

        globalCounter = 0;
        setTimeout(function(){
            drawPath(path);
        }, ((time * 1000) / accuracy) * i);
        setTimeout(function(){
            $("#horzSpeedSlider").attr('disabled', false);

        }, time * 1000);
    }
    context.lineWidth = 10;
}

var timerInterval;
function changeHorzSpeed(value){
    horzSpeed = value;
    document.getElementById("test").innerHTML = horzSpeed;
    clearTimeout(timerInterval);
    timerInterval = setTimeout(function(){
        drawLine();
    }, 1500);
}

globalCounter = 0;
function drawPath(path){
    context.lineTo(path[globalCounter][0], path[globalCounter][1]);
    globalCounter++;
    context.stroke();
}