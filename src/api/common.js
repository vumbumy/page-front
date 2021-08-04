import axios from "axios";
import path from "@/config/path";
// import store from "@/store";

export const Api = axios.create({
  baseURL: path.baseURL,
  headers: {
    'Content-type': 'application/json',
    'X-Auth-Token': localStorage.accessToken
  }
});
