import {Api} from "@/api/common";
import path from "@/config/path";

export function getTypeList() {
  return new Promise(function(resolve) {
    Api.get(path.api.types)
      .then(res => {
        resolve(res.data)
      })
  });
}

export function getDataTypeList() {
  return new Promise(function(resolve) {
    Api.get(path.api.types_data_types)
      .then(res => {
        resolve(res.data)
      })
  });
}
