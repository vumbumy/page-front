import {Api} from "@/api/common";

import path from "@/config/path";

export function join (email, password) {
  let data = {
    userName: email,
    password: password
  }

  return new Promise((resolve, reject) => {
    Api.post(path.auth.sign.up, data,
      {headers: {'Content-Type': 'application/json'}}
    )
      .then(() => resolve())
      .catch(err => reject(err.response))
  })
}
