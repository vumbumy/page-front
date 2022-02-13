import {Api} from "@/api/common";

import path from "@/config/path";

// export function getSecuredUserList () {
//   return new Promise(function(resolve) {
//     Api.get(path.secured.users)
//       .then(res => {
//         resolve(res.data)
//       })
//   });
// }

export function getUserList () {
  return new Promise(function(resolve) {
    Api.get(path.secured.users)
      .then(res => {
        resolve(res.data)
      })
  });
}

export function updateUser (user) {
  return new Promise(function(resolve) {
    Api.put(path.secured.users, user)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => console.log(err.response))
  });
}
