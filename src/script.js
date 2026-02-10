import {initBuffers} from "./initBuffers.js";
import {drawScene} from "./drawScene.js";

function adjustScreen(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
    console.log("unable to init shader program")

    return null;
  }

  return shaderProgram;
}

function loadShader(gl, type, source){
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);

  gl.compileShader(shader);

  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
    console.log("error when compiling shaders");

    return null;
  }

  return shader;
}

function main(){
  const canvas = document.querySelector("#canvas");

  adjustScreen();

  const gl = canvas.getContext("webgl");

  const vsSource = `
    attribute vec4 aVertexPosition;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
  `;

  const fsSource = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `;

  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  const programInfo = {
    program: shaderProgram,

    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
    },

    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
    },

  };

  gl.clearColor(0.0,0.0,0.0,1.0);

  gl.clear(gl.COLOR_BUFFER_BIT);

  //init square
  const buffers = initBuffers(gl);

  //square
  drawScene(gl, programInfo, buffers);
}

main();
