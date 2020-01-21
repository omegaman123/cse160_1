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
    // console.log(x, y);
    draw(shapes);
}

function drawTriangle(x, y,color) {
    console.log("in drawTriangle");
    // initTriangleVertexBuffers(gl,size);
    gl.uniform2f(offsetLoc, x, y);
    // gl.uniformMatrix4fv(xForm, false, xformMatrix);
    gl.uniform3fv(fColorLocation, color);
    gl.drawArrays(gl.TRIANGLES, 0, buffers.triangle);
    // gl.drawArrays(gl.TRIANGLE_STRIP, 0, buffers.circle);
}

function drawCircle(x,y,color){
    console.log("in drawcircle");
    gl.uniform2f(offsetLoc, x, y);
    // gl.uniformMatrix4fv(xForm, false, xformMatrix);
    gl.uniform3fv(fColorLocation, color);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, buffers.circle);
    // gl.drawArrays(gl.TRIANGLES, 0, buffers.triangle);

}

function draw(shapeArr){
    var len = shapeArr.length;
    for (var i = 0; i < len; i++) {
        console.log(shapeArr[i]);
        if (shapeArr[i].type === 'triangle') {
            console.log("Drawing a triangle");
            // initCircleBuffers(360);
            drawTriangle(shapeArr[i].x, shapeArr[i].y, shapeArr[i].color);
        } else if (shapeArr[i].type==='circle') {
            console.log("drawing a circle");
            // initTriangleVertexBuffers();
            drawCircle(shapeArr[i].x, shapeArr[i].y, shapeArr[i].color)
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
    if (typ === 'triangle'){
        initTriangleVertexBuffers()
    } else {
        initCircleBuffers(360);
    }
    draw(shapes);
};

document.getElementById('circle').onclick = function () {
    typ = 'circle';
    draw(shapes);
};

document.getElementById('triangle').onclick = function () {
    typ = 'triangle';
    draw(shapes)
};



