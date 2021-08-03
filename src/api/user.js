import {Api} from "@/api/common";

import path from "@/config/path";

export function getUserList () {
  return new Promise(function(resolve) {
    Api.get(path.admin.users)
      .then(res => {
        resolve(res.data)
      })
  });
}
