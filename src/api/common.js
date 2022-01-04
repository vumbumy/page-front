import axios from "axios";
import path from "@/config/path";

export const Api = axios.create({
  baseURL: path.baseURL,
  headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${localStorage.accessToken}`
  }
});

export const PUBLIC = {
  KEY: "PUBLIC",
  ICON: 'mdi-earth'
}

export const GROUP = {
  KEY: "GROUP",
  ICON: 'mdi-account-group'
}

export const PRIVATE = {
  KEY: "PRIVATE",
  ICON: 'mdi-lock-outline'
}

export class Permission {
  userNo = null;
  groupNo = null;
  accessRight = "";
}
