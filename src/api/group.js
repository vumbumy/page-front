import {Api} from "@/api/common";

import path from "@/config/path";

export function getUserGroupList () {
  return new Promise(function(resolve) {
    Api.get(path.admin.groups)
      .then(res => {
        resolve(res.data)
      })
  });
}
