function initBuffers(gl){

  //class or structure for PositionBuffer
  const positionBuffer = initPositionBuffer(gl);

  return{
    position: positionBuffer,
  };
}

//initialize Position Buffer for a square
function initPositionBuffer(gl){
  const positionBuffer = gl.createBuffer();

  // create a array buffer (vertices) to store/bind to positionBuffer
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // square vertices
  const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];

  //draw the shape based on the positionBuffer (square)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  return positionBuffer;
}

export{initBuffers};