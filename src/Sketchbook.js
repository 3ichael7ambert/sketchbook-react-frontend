import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";

//import { useSpring, animated } from "react-spring";
//import { useParams } from "react-router-dom";

import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import Navigation from "./Navigation";
import StickyNote from "./StickyNote";

// import Pencil from './Pencil';
// import Eraser from './Eraser';
// import PaperClip from './PaperClip';

import ControlPanel from "./ControlPanel";
import { fabric } from "fabric";

// import FlipPage from './FlipPage';

import imgPencil from "./imgs/Pencil.png";
import imgPaperClip from "./imgs/Paperclip.png";
import imgEraser from "./imgs/Eraser.png";
import DrawingCanvasApi from "./Api";

//import { gsap, TimelineMax } from "gsap";

// import styled from "styled-components";

// import WebFont from 'https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@700&display=swap';

import "./Sketchbook.css";

const Sketchbook = () => {
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight - 100,
  });
  const { editor, onReady } = useFabricJSEditor();
  const [drawingMode, setDrawingMode] = useState(false);
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState("#000000");
  const [savedMessageVisible, setSavedMessageVisible] = useState(false);
  const [eraserMode, setEraserMode] = useState(false);

  const updateCanvasSize = useCallback(
    (width, height) => {
      if (editor) {
        editor.canvas.setWidth(width);
        editor.canvas.setHeight(height);
        editor.canvas.renderAll();
      }
    },
    [editor]
  );

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight - 30,
      });
      updateCanvasSize(window.innerWidth, window.innerHeight - 30);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [editor, updateCanvasSize]);

  useEffect(() => {
    updateCanvasSize(canvasSize.width, canvasSize.height - 30);
  }, [editor, updateCanvasSize, canvasSize]);

  const addComponent = (Component) => {
    console.log(`Adding ${Component.name}...`);

    if (editor) {
      const fabricObject = new fabric.Rect({
        width: 100,
        height: 100,
        fill: "red",
      });
      editor.canvas.add(fabricObject);
      editor.canvas.setActiveObject(fabricObject);
      editor.canvas.renderAll();
    }
  };

  useEffect(() => {
    if (editor) {
      const canvas = editor.canvas;

      // Check if the device supports pressure events
      if (window.PointerEvent) {
        canvas.on("pointerdown", handlePointerDown);
      } else {
        console.warn("Pressure sensitivity not supported on this device.");
      }
    }
  }, [editor]);

  const handlePointerDown = (event) => {
    if (event.pressure) {
      const initialPressure = event.pressure;
      let lastPressure = initialPressure;

      editor.canvas.on("pointermove", (event) => {
        const pressure = event.pressure || lastPressure;
        const strokeWidth = Math.max(1, pressure * 10);

        const path = new fabric.Path(event.absolutePointer, {
          strokeWidth,
          stroke: brushColor,
          fill: brushColor,
          selectable: false,
          evented: false,
        });

        editor.canvas.add(path);
        lastPressure = pressure;
      });

      editor.canvas.on("pointerup", () => {
        editor.canvas.off("pointermove");
        editor.canvas.off("pointerup");
      });
    }
  };

  const addPaperclip = () => {
    console.log("Adding Pqperclip Image...");
    const imgUrl = imgPaperClip;
    const randomLeft = Math.floor(
      Math.random() * (window.innerWidth + 200) - 200
    );
    const randomTop = Math.floor(
      Math.random() * (window.innerHeight - 30) + 30
    );
    const randomAngle = Math.floor(Math.random() * 360);

    fabric.Image.fromURL(imgUrl, (img) => {
      img.set({
        left: randomLeft,
        top: randomTop,
        angle: randomAngle,
        scaleX: 0.15,
        scaleY: 0.15,

        shadow: {
          color: "rgba(0, 0, 0, 0.5)", // Shadow color
          blur: 20, // Shadow blur
          offsetX: 15, // Horizontal offset of the shadow
          offsetY: 15, // Vertical offset of the shadow
        },

        borderColor: "transparent", // Make border invisible
        cornerColor: "transparent", // Make corner invisible
        cornerStrokeColor: "transparent", // Make corner stroke invisible
        cornerStyle: "invisible", // Hide corner altogether
        transparentCorners: true, // Ensure transparent corners
        padding: 0, // Remove padding around the object
        borderDashArray: [3, 3],
      });
      editor.canvas.add(img);
      editor.canvas.setActiveObject(img);
      editor.canvas.renderAll();
    });
  };

  const addEraser = () => {
    console.log("Adding Pen Image...");
    const imgUrl = imgEraser;
    const randomLeft = Math.floor(
      Math.random() * (window.innerWidth + 200) - 200
    );
    const randomTop = Math.floor(
      Math.random() * (window.innerHeight - 30) + 30
    );
    const randomAngle = Math.floor(Math.random() * 360);

    fabric.Image.fromURL(imgUrl, (img) => {
      img.set({
        left: randomLeft,
        top: randomTop,
        angle: randomAngle,
        scaleX: 0.16,
        scaleY: 0.16,

        shadow: {
          color: "rgba(0, 0, 0, 0.5)", // Shadow color
          blur: 20, // Shadow blur
          offsetX: 15, // Horizontal offset of the shadow
          offsetY: 15, // Vertical offset of the shadow
        },

        borderColor: "transparent", // Make border invisible
        cornerColor: "transparent", // Make corner invisible
        cornerStrokeColor: "transparent", // Make corner stroke invisible
        cornerStyle: "invisible", // Hide corner altogether
        transparentCorners: true, // Ensure transparent corners
        padding: 0, // Remove padding around the object
        borderDashArray: [3, 3], // Optionally add a dash array to the border (dashed border)
      });
      editor.canvas.add(img);
      editor.canvas.setActiveObject(img);
      editor.canvas.renderAll();
    });
  };

  const addPencil = () => {
    console.log("Adding Pencil Image...");
    const imgUrl = imgPencil;
    const randomLeft = Math.floor(
      Math.random() * (window.innerWidth + 200) - 200
    );
    const randomTop = Math.floor(
      Math.random() * (window.innerHeight - 30) + 30
    );
    const randomAngle = Math.floor(Math.random() * 360);

    fabric.Image.fromURL(imgUrl, (img) => {
      img.set({
        left: randomLeft,
        top: randomTop,
        angle: randomAngle,
        scaleX: 0.4,
        scaleY: 0.4,

        shadow: {
          color: "rgba(0, 0, 0, 0.5)",
          blur: 20,
          offsetX: 15,
          offsetY: 15,
        },

        borderColor: "transparent", // Make border invisible
        cornerColor: "transparent", // Make corner invisible
        cornerStrokeColor: "transparent", // Make corner stroke invisible
        cornerStyle: "invisible", // Hide corner altogether
        transparentCorners: true, // Ensure transparent corners
        padding: 0, // Remove padding around the object
        borderDashArray: [3, 3],
      });

      editor.canvas.add(img);
      editor.canvas.setActiveObject(img);
      editor.canvas.renderAll();
    });
  };

  const addCircle = () => {
    console.log("Adding Circle...");
    const fabricCircle = new fabric.Circle({
      left: window.innerWidth / 2,
      top: window.innerHeight / 2,

      radius: 50,
      fill: brushColor,
      borderColor: "black",
      cornerColor: "black",
    });
    editor.canvas.add(fabricCircle);
    editor.canvas.setActiveObject(fabricCircle);
    editor.canvas.renderAll();
  };

  const addSquare = () => {
    console.log("Adding Circle...");
    const fabricSquare = new fabric.Rect({
      left: window.innerWidth / 2,
      top: window.innerHeight / 2,

      width: 50,
      height: 50,
      fill: brushColor,
      borderColor: "black",
      cornerColor: "black",
    });

    editor.canvas.add(fabricSquare);
    editor.canvas.setActiveObject(fabricSquare);
    editor.canvas.renderAll();
  };

  //REMOVE
  const addText = () => {
    console.log("Adding Circle...");
    const fabricText = new fabric.IText("Hello, Fabric.js!", {
      left: window.innerWidth / 2,
      top: window.innerHeight / 2,

      fill: brushColor,
      fontFamily: "handwriting",
      borderColor: "black",
      cornerColor: "black",
    });
    editor.canvas.add(fabricText);
    editor.canvas.setActiveObject(fabricText);
    editor.canvas.renderAll();
  };

  const toggleDrawingMode = () => {
    setDrawingMode(!drawingMode);

    if (editor) {
      editor.canvas.isDrawingMode = !drawingMode;

      if (drawingMode) {
        // If drawing mode was active, deactivate it
        editor.canvas.off("path:created");
      } else {
        // If drawing mode was inactive, activate it
        editor.canvas.on("path:created", (options) => {
          const path = options.path;

          path.set({
            selectable: false,
            evented: false,
            strokeWidth: brushSize,
            stroke: brushColor,
          });

          editor.canvas.sendToBack(path);
        });
      }
    }
  };

  const getRandomCanvas = async () => {
    try {
      // Fetch random canvas SVG from the API
      const response = await DrawingCanvasApi.getRandomCanvas();
      const jsonData = response.data;
      const svgData = JSON.parse(jsonData).canvasData;

      console.log("API Response:", response);
      console.log("SVG Data:", svgData);

      // Check if SVG data is a non-empty string
      if (typeof svgData === "string" && svgData.trim() !== "") {
        // Clear the canvas before loading new content
        editor.canvas.clear();

        // Load canvas from SVG data
        fabric.loadSVGFromString(svgData, (objects, options) => {
          console.log(
            "Load SVG Callback - objects:",
            objects,
            "options:",
            options
          );

          if (Array.isArray(objects) && objects.length > 0) {
            fabric.util.enlivenObjects(objects, (enlivenedObjects) => {
              enlivenedObjects.forEach((object) => {
                // Check if the object has necessary properties and methods
                if (object && object.type) {
                  // Customize object properties based on type
                  switch (object.type) {
                    case "rect":
                      object.fill = object.fill || "transparent"; // Set default fill
                      break;
                    case "path":
                      object.stroke = object.stroke || "black"; // Set default stroke
                      break;

                    default:
                      break;
                  }

                  // Check if the object has the '_set' method before adding
                  if (object._set) {
                    // Add the enlivened object to the canvas
                    editor.canvas.add(object);
                  } else {
                    console.error(
                      "Object is missing required methods:",
                      object
                    );
                  }
                } else {
                  console.error("Invalid object:", object);
                }
              });

              // Render all objects on the canvas
              editor.canvas.renderAll();
            });
          } else {
            console.error("Invalid SVG data format or empty array of objects.");
          }
        });
      } else {
        console.error("Received empty or invalid SVG data from the API.");
      }
    } catch (error) {
      console.error("Error loading canvas from the database:", error);
    }
  };

  const saveCanvas = async () => {
    try {
      if (editor) {
        // Convert canvas to SVG data
        const svgData = editor.canvas.toSVG();

        // Send SVG data to the API for saving
        await DrawingCanvasApi.saveCanvas({ canvasData: svgData });

        console.log("Setting savedMessageVisible to true");
        setSavedMessageVisible(true);

        // Hide the message after a delay (e.g., 2 seconds)
        setTimeout(() => {
          setSavedMessageVisible(false);
          console.log("Setting savedMessageVisible to false");
        }, 2000);

        console.log("Canvas saved successfully!");
      }
    } catch (error) {
      console.error("Error saving canvas:", error);
    }
  };

  const getCanvasById = async (canvasId) => {
    try {
      const response = await DrawingCanvasApi.getCanvasById(canvasId);
      const jsonData = response.data;
      const svgData = JSON.parse(jsonData).canvasData;

      if (typeof svgData === "string" && svgData.trim() !== "") {
        editor.canvas.clear();

        fabric.loadSVGFromString(svgData, (objects, options) => {
          console.log(
            "Load SVG Callback - objects:",
            objects,
            "options:",
            options
          );

          if (Array.isArray(objects) && objects.length > 0) {
            fabric.util.enlivenObjects(objects, (enlivenedObjects) => {
              enlivenedObjects.forEach((object) => {
                // Check if the object has necessary properties and methods
                if (object && object.type) {
                  // Customize object properties based on type
                  switch (object.type) {
                    case "rect":
                      object.fill = object.fill || "transparent"; // Set default fill
                      break;
                    case "path":
                      object.stroke = object.stroke || "black"; // Set default stroke
                      break;

                    default:
                      break;
                  }

                  // Check if the object has the '_set' method before adding
                  if (object._set) {
                    // Add the enlivened object to the canvas
                    editor.canvas.add(object);
                  } else {
                    console.error(
                      "Object is missing required methods:",
                      object
                    );
                  }
                } else {
                  console.error("Invalid object:", object);
                }
              });

              // Render all objects on the canvas
              editor.canvas.renderAll();
            });
          } else {
            console.error("Invalid SVG data format or empty array of objects.");
          }
        });
      } else {
        console.error("Received empty or invalid SVG data from the API.");
      }
    } catch (error) {
      console.error("Error loading canvas by ID:", error);
    }
  };

  useEffect(() => {
    // Extract canvas ID from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const canvasId = urlParams.get("canvasId");

    if (canvasId) {
      getCanvasById(canvasId);
    }

    // Set savedMessageVisible to false after a delay (e.g., 2 seconds)
    const timeoutId = setTimeout(() => {
      setSavedMessageVisible(false);
    }, 2000);

    // Clear the timeout when the component unmounts or when canvasId changes
    return () => clearTimeout(timeoutId);
  }, [getCanvasById]);

  const clearCanvas = async () => {
    editor.canvas.clear();
  };

  const exportCanvas = () => {
    if (editor) {
      console.log("Canvas before exporting:", editor.canvas);

      // Convert canvas to data URL
      const canvasDataURL = editor.canvas.toDataURL();

      console.log("Canvas data URL:", canvasDataURL);

      // Create an anchor element to trigger download
      const downloadLink = document.createElement("a");
      downloadLink.href = canvasDataURL;
      downloadLink.download = "canvas_image.png";

      // Trigger a click event to download the image
      downloadLink.click();
    }
  };

  const onBrushSizeChange = (size) => {
    setBrushSize(size);
  };

  const onBrushColorChange = (color) => {
    setBrushColor(color);
  };

  const handleShareCanvas = async () => {
    try {
      // Save the canvas and get the ID
      const canvasId = await DrawingCanvasApi.saveAndShareCanvas(
        editor.canvas.toSVG()
      );

      // Log the canvasId to verify it
      console.log("Canvas ID:", canvasId);

      // Redirect to the same page with the canvasId as a query parameter
      window.location.href = `${window.location.origin}${window.location.pathname}?canvasId=${canvasId}`;
    } catch (error) {
      console.error("Error sharing canvas:", error);
    }
  };

  const eraserModeFunc = () => {
    console.log("Adding Eraser Image...");
    setEraserMode(true);
  };

  useEffect(() => {
    if (editor) {
      const canvas = editor.canvas;

      canvas.on("mouse:down", (event) => {
        if (eraserMode) {
          // Handle erasing logic here
          const pointer = canvas.getPointer(event.e);
          const objects = canvas.getObjects();
          const target = canvas.findTarget(pointer, null, true);

          if (target) {
            // Erase the target object
            canvas.remove(target);
            canvas.renderAll();
          }
        }
      });
    }
  }, [editor, eraserMode]);

  return (
    <div className="sketchbook-container">
      <div
        style={{ visibility: savedMessageVisible ? "visible" : "hidden" }}
        className="saved-message">
        Canvas Saved!
      </div>

      <Navigation
        // onAddStickyNote={addStickyNote}
        onAddPencil={addPencil}
        onAddPaperclip={addPaperclip}
        onAddEraser={addEraser}
        onAddCircle={addCircle}
        onAddSquare={addSquare}
        // onAddText={addText}
        // onAddPenImage={addPenImage}
        onToggleDrawingMode={toggleDrawingMode}
        onSaveCanvas={saveCanvas}
        onRandomCanvas={getRandomCanvas}
        onClearCanvas={clearCanvas}
        brushSize={brushSize}
        brushColor={brushColor}
        onBrushSizeChange={onBrushSizeChange}
        onBrushColorChange={onBrushColorChange}
      />
      {/* <FlipPage> */}
      <FabricJSCanvas className="sketchbook-canvas" onReady={onReady} />
      {/* </FlipPage> */}
      <ControlPanel
        // onAddStickyNote={addStickyNote}
        onAddPencil={addPencil}
        onAddPaperclip={addPaperclip}
        onAddEraser={addEraser}
        onAddCircle={addCircle}
        // onAddPenImage={addPenImage}
        onToggleDrawingMode={toggleDrawingMode}
        onSaveCanvas={saveCanvas}
        onRandomCanvas={getRandomCanvas}
        onClearCanvas={clearCanvas}
        onExportCanvas={exportCanvas}
        onShareCanvas={handleShareCanvas}
      />
    </div>
  );
};

export default Sketchbook;
