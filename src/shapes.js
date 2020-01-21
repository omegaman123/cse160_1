var shapes = [];
var buffers = {};

// The array for the position of Triangle with mouse click\
function click(ev) {
    var x = ev.clientX; // x coordinate of a mouse pointer
    var y = ev.clientY; // y coordinate of a mouse pointer
    var rect = ev.target.getBoundingClientRect();

    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);
    let shape = {"x": x, "y": y, "color": color, "type": typ, "size":size, "segm":segm};
    // Store the coordinates to shapes array
    shapes.push(shape);
    // console.log(x, y);
    draw(shapes);
}

function drawTriangle(x, y,color,size) {
    // initTriangleVertexBuffers(gl,size);
    gl.bindBuffer(gl.ARRAY_BUFFER, tVertexBuffer);
    //Write date into the buffer object
    let nVert = [];
    for (let i = 0; i < tVertices.length; i++){
        nVert.push(tVertices[i]*size);
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(nVert), gl.STATIC_DRAW);

    let a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location  of a_Position');
        return -1;
    }

    //Connect the assignment to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    //Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);
    gl.uniform2f(offsetLoc, x, y);
    // gl.uniformMatrix4fv(xForm, false, xformMatrix);
    gl.uniform3fv(fColorLocation, color);
    gl.drawArrays(gl.TRIANGLES, 0, buffers.triangle);
    // gl.drawArrays(gl.TRIANGLE_STRIP, 0, buffers.circle);
}

function drawCircle(x,y,color,size,seg){
    console.log("draw circle seg " + seg);
    initCircleBuffers(360, seg);
    gl.bindBuffer(gl.ARRAY_BUFFER,cVertexBuffer);
    let nVert = [];
    for (let i = 0; i < cVertices.length; i++){
        nVert.push(cVertices[i]*size/10);
    }

    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(nVert),gl.STATIC_DRAW);
    let a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    //Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);
    gl.uniform2f(offsetLoc, x, y);
    // gl.uniformMatrix4fv(xForm, false, xformMatrix);
    gl.uniform3fv(fColorLocation, color);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, buffers.circle);
    // gl.drawArrays(gl.TRIANGLES, 0, buffers.triangle);

}

function draw(shapeArr){
    var len = shapeArr.length;
    for (var i = 0; i < len; i++) {
        if (shapeArr[i].type === 'triangle') {
            // initCircleBuffers(360);
            drawTriangle(shapeArr[i].x, shapeArr[i].y, shapeArr[i].color, shapeArr[i].size);
        } else if (shapeArr[i].type==='circle') {
            // initTriangleVertexBuffers();
            drawCircle(shapeArr[i].x, shapeArr[i].y, shapeArr[i].color,shapeArr[i].size,shapeArr[i].segm)
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
    draw(shapes);
};

document.getElementById('segSlide').onchange = function(){
segm = document.getElementById('segSlide').value;

};

document.getElementById('circle').onclick = function () {
    typ = 'circle';
    draw(shapes);
};

document.getElementById('triangle').onclick = function () {
    typ = 'triangle';
    draw(shapes)
};



