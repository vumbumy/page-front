import {Api} from "@/api/common";

import path from "@/config/path";

export function getScheduleList() {
  return new Promise(function(resolve) {
    Api.get(path.secured.schedules)
      .then(res => {
        resolve(res.data)
      })
  });
}
