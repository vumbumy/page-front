import {Api} from "@/api/common";
import path from "@/config/path";

export function getColumns() {
  return new Promise(function(resolve) {
    Api.get(path.api.columns)
      .then(res => {
        resolve(res.data)
      })
  });
}

export function getColumnsType() {
  return new Promise(function(resolve) {
    Api.get(path.api.columns_type)
      .then(res => {
        resolve(res.data)
      })
  });
}

export class DataColumn {
  columnNo = null;

  columnName = null;

  columnType = null;

  defaultValue = null;

  required = false;

  deleted = false;
}
