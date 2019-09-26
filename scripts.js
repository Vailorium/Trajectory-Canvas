var c;

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

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
    };
}

$(document).ready(function(){
    c = document.getElementById("mainCanvas");
    context = c.getContext("2d");
    $("#mainCanvas").click(function(ev){
        context = c.getContext("2d");
        context.beginPath();
        context.moveTo(50.5, 50);

        var mousePos = getMousePos(c, ev);
        console.log(mousePos);
        context.lineTo(this.relMouseCoords(ev).x, this.relMouseCoords(ev).y);
        context.stroke();
    });
});