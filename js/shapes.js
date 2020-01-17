var shapes = [];
var buffers = {};

// The array for the position of Triangle with mouse click\
function click(ev) {
    var x = ev.clientX; // x coordinate of a mouse pointer
    var y = ev.clientY; // y coordinate of a mouse pointer
    var rect = ev.target.getBoundingClientRect();

    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);


    let shape = {"x": x, "y": y, "color": color, "type": typ};
    // Store the coordinates to shapes array
    shapes.push(shape);
    console.log(x, y);
    draw();
}

function drawTriangle(x, y,color) {
    // initTriangleVertexBuffers(gl,size);
    gl.uniform2f(offsetLoc, x, y);
    // gl.uniformMatrix4fv(xForm, false, xformMatrix);
    gl.uniform3fv(fColorLocation, color);
    gl.drawArrays(gl.TRIANGLES, 0, buffers.triangle);
}

function drawCircle(x,y,color){
    gl.uniform2f(offsetLoc, x, y);
    // gl.uniformMatrix4fv(xForm, false, xformMatrix);
    gl.uniform3fv(fColorLocation, color);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, buffers.circle);

}

function draw(){
    var len = shapes.length;
    for (var i = 0; i < len; i++) {
        // Draw
        // gl.uniform2f(offsetLoc, shapes[i].x, shapes[i].y);
        // // gl.uniformMatrix4fv(xForm, false, xformMatrix);
        // gl.uniform3fv(fColorLocation, shapes[i].color);
        // gl.drawArrays(gl.TRIANGLES, 0, 3);
        if (shapes[i].type === 'triangle') {
            drawTriangle(shapes[i].x, shapes[i].y, shapes[i].color);
        } else {
            drawCircle(shapes[i].x, shapes[i].y, shapes[i].color)
        }
    }
}

document.getElementById('canvas').addEventListener("mousedown", function (e) {
    click(e);
    document.getElementById('canvas').onmousemove = function (e) {
        click(e);
    }

});

document.getElementById('canvas').addEventListener("mouseup", function (e) {
    document.getElementById('canvas').onmousemove = null
});

document.getElementById('clearCanvas').onclick = function () {
    gl.clear(gl.COLOR_BUFFER_BIT);
    shapes = [];
};

document.getElementById('redSlide').onchange = function () {
    color = [document.getElementById('redSlide').value / 255,
        document.getElementById('greenSlide').value / 255,
        document.getElementById('blueSlide').value / 255
    ];
};

document.getElementById('greenSlide').onchange = function () {
    color = [document.getElementById('redSlide').value / 255,
        document.getElementById('greenSlide').value / 255,
        document.getElementById('blueSlide').value / 255
    ];
};

document.getElementById('blueSlide').onchange = function () {
    color = [document.getElementById('redSlide').value / 255,
        document.getElementById('greenSlide').value / 255,
        document.getElementById('blueSlide').value / 255
    ];
};
document.getElementById('sizeSlide').onchange = function () {
    size = document.getElementById('sizeSlide').value;
    initCircleBuffers(360);

};

document.getElementById('circle').onclick = function () {
    initCircleBuffers(360);
    
    // typ = 'circle';
    draw();
};

document.getElementById('triangle').onclick = function () {
    initTriangleVertexBuffers();
    // typ = 'triangle';
    draw()
};



