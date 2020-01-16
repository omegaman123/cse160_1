var shapes = [];

// The array for the position of Triangle with mouse click\
function click(ev) {
    var x = ev.clientX; // x coordinate of a mouse pointer
    var y = ev.clientY; // y coordinate of a mouse pointer
    var rect = ev.target.getBoundingClientRect() ;

    x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);


    let shape = {"x":x, "y":y,"color":color,"size":size};

    // Store the coordinates to shapes array
    shapes.push(shape);
    var len = shapes.length;
    console.log(x,y);
        for (var i = 0; i < len; i++) {
            // Draw
             gl.uniform2f(offsetLoc, shapes[i].x, shapes[i].y);
            gl.uniformMatrix4fv(xForm, false, xformMatrix);
            gl.uniform3fv(fColorLocation, shapes[i].color);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        }

}

document.getElementById('canvas').addEventListener("mousedown", function(e){
    click(e);
    document.getElementById('canvas').onmousemove = function(e) {
        click(e);
    }

});

document.getElementById('canvas').addEventListener("mouseup", function(e){
    document.getElementById('canvas').onmousemove = null
});

document.getElementById('clearCanvas').onclick = function () {
    gl.clear(gl.COLOR_BUFFER_BIT);
    shapes = [];
};

document.getElementById('redSlide').onchange = function () {
    color = [document.getElementById('redSlide').value/255,
        document.getElementById('greenSlide').value/255,
        document.getElementById('blueSlide').value/255
    ];
};

document.getElementById('greenSlide').onchange = function () {
    color = [document.getElementById('redSlide').value/255,
        document.getElementById('greenSlide').value/255,
        document.getElementById('blueSlide').value/255
    ];
};

document.getElementById('blueSlide').onchange = function () {
    color = [document.getElementById('redSlide').value/255,
        document.getElementById('greenSlide').value/255,
        document.getElementById('blueSlide').value/255
    ];
};
document.getElementById('sizeSlide').onchange = function () {
 size = document.getElementById('sizeSlide').value;
 initTriangleVertexBuffers(gl,size);
};




