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

export function getSecuredUserGroupList () {
  return new Promise(function(resolve) {
    Api.get(path.secured.groups)
      .then(res => {
        resolve(res.data)
      })
  });
}

export function getUserGroup(groupNo) {
  return new Promise(function(resolve) {
    Api.get(`${path.admin.groups}/${groupNo}`)
      .then(res => {
        resolve(res.data)
      })
  });
}

export function updateUserGroupUsers(groupNo, userList) {
  return new Promise(function(resolve) {
    Api.put(`${path.admin.groups}/${groupNo}/users`, userList)
      .then(res => {
        resolve(res.data)
      })
  });
}
