import React, { useRef, useEffect } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { fabric } from 'fabric';

const StickyNote = () => {
  const canvasRef = useRef(null);

  const handleClear = () => {
    canvasRef.current.clear();
  };

    // Function to make the canvas background transparent
    const makeCanvasTransparent = () => {
      const canvas = canvasRef.current.canvasContainer.children[1];
      canvas.style.backgroundColor = 'transparent';
    };



  useEffect(() => {
    const stickyNoteCanvas = new fabric.Canvas('stickyNote');
    const stickyNote = new fabric.Rect({
      width: 100,
      height: 100,
      fill: 'yellow',
      originX: 'center',
      originY: 'center',
      centeredRotation: true,
    });
    stickyNoteCanvas.add(stickyNote);

    // Clean up on component unmount
    return () => {
      stickyNoteCanvas.dispose();
    };
  }, []);

  return (
    <div>
      {/* Buttons outside of the drawable area */}
      <button onClick={handleClear} class="clearBtnTab">Clear Canvas</button>
      <button onClick={makeCanvasTransparent}>Make Canvas Transparent</button>
   
      {/* <button onClick={handleRotate}>Rotate Sticky Note</button> */}

      {/* Canvas for drawing */}
      <CanvasDraw
        ref={canvasRef}
        brushColor="#000"
        canvasWidth={400}
        canvasHeight={400}
        hideGrid
        lazyRadius={10}
        brushRadius={2}
        id="stickyNote"
      />

      {/* Sticky Note representation using fabric.js */}
      {/* <canvas
        id="stickyNote"
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: '200px', right: '200px' }}
      > 
      </canvas> */}
    </div>
  );
};

export default StickyNote;
