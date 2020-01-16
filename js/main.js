//Vertex shader program
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform vec2 u_Offset;
  uniform mat4 u_xformMatrix;
  void main() {
    gl_Position = ((a_Position + vec4(u_Offset, 0, 0))*u_xformMatrix);
  }`;

// Fragment shader program
var FSHADER_SOURCE = `
precision mediump float;
uniform vec3 mycolor;
void main() {
  gl_FragColor = vec4(mycolor, 1);
}
`;

var offsetLoc;
let gl;
let canvas;
var fColorLocation;
var color = [];
let size;
var xformMatrix;

var xForm;


function main() {
    // Retrieve <canvas> element
     canvas = document.getElementById('canvas');

    // Get the rendering context for WebGL
     gl = canvas.getContext("webgl");
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    }
    offsetLoc = gl.getUniformLocation(gl.program, "u_Offset");
    fColorLocation = gl.getUniformLocation(gl.program, "mycolor");

    size = document.getElementById('sizeSlide').value;
    initTriangleVertexBuffers(gl,size);
    // // // Register function (event handler) to be called on a mouse press

    // Specify the color for clearing <canvas>
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    color = [document.getElementById('redSlide').value/255,
             document.getElementById('greenSlide').value/255,
             document.getElementById('blueSlide').value/255
            ];
    xForm = gl.getUniformLocation(gl.program, 'u_xformMatrix');
     xformMatrix = new Float32Array([
        size,   0.0,  0.0,  0.0,
        0.0,   size,  0.0,  0.0,
        0.0,   0.0,   size,  0.0,
        0.0,   0.0,   0.0,  1.0
    ]);

}

function initShaders(gl, vsrc, fsrc) {
    // initShaders is really poorly designed. Most WebGL programs need multiple shader programs
    // but this function assumes there will only ever be one shader program
    // Also you should never assign values to the gl context.
    gl.program = twgl.createProgram(gl, [vsrc, fsrc]);
    gl.useProgram(gl.program);
    return gl.program;
}

//Make the BO for making triangle
function initTriangleVertexBuffers(gl,size){

    var vertices = new Float32Array([
        0.0, 0.1,
        -0.1, -0.1,
        0.1, -0.1,
    ]);
    var n = 3;

    //Create a buffer Object
    var positionBuffer = gl.createBuffer();
    if(!positionBuffer){
        console.log('Failed to create the buffer object');
        return -1;
    }

    //Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    //Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    //Assign the buffer object to a_Position variable
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location  of a_Position');
        return -1;
    }

    //Connect the assignment to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    //Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    return n;
}
