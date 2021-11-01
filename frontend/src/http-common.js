import { create } from "axios";

const http = create({
  baseURL: "http://localhost:3002/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default http;
