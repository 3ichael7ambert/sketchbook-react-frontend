import "@testing-library/jest-dom/extend-expect";

// Mock SVG files for Jest
module.exports = {
  process(_, filename) {
    return `module.exports = '${filename}';`;
  },
};
