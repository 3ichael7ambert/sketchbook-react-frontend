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
                  console.error("Object is missing required methods:", object);
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
