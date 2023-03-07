import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  timeout: 2000,
});

export default server;
