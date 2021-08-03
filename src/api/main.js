import {Api} from "@/api/common";

import path from "@/config/path";

export function join (email, password) {
  let data = {
    userName: email,
    password: password
  }

  // using JSONPlaceholder
  Api.post(path.sign.up, data,
    {headers: {'Content-Type': 'application/json'}}
  )
    .then(result => console.log(result))
    .catch((err) => console.log(err))
}
