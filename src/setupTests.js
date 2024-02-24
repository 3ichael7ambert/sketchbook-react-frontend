import "@testing-library/jest-dom/extend-expect";
import "jest-canvas-mock";

// Mock SVG files for Jest
module.exports = {
  process(_, filename) {
    return `module.exports = '${filename}';`;
  },
};
