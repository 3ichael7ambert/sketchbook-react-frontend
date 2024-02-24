import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3005";

class DrawingCanvasApi {
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { "Content-Type": "application/json" };

    try {
      return (await axios({ url, method, data, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Save a canvas drawing. */
  static async saveCanvas(canvasData) {
    return this.request("canvas", { canvasData }, "post");
  }

  /** Get details on a specific canvas by ID. */
  static async getCanvas(canvasId) {
    return this.request(`canvas/${canvasId}`);
  }

  /** Get details on a specific canvas by ID. */
  static async getCanvasById(canvasId) {
    return this.request(`canvas/${canvasId}`);
  }

  /** Get a random canvas drawing. */
  static async getRandomCanvas() {
    return this.request("random");
  }
}

export default DrawingCanvasApi;
