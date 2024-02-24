import React, { useRef, useEffect } from 'react';
import { fabric } from 'fabric';

const DrawingCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true,
    });

    // Add event listeners for drawing events

    return () => {
      // Cleanup canvas and event listeners
      canvas.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default DrawingCanvas;
