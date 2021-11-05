import {Api} from "@/api/common";

import path from "@/config/path";

export function getProjectList(status = null) {
  return new Promise(function(resolve) {
    Api.get(path.secured.projects, {
      params: {
        status: status
      }
    })
      .then(res => {
        resolve(res.data)
      })
  });
}

// export function getPublicProjectList() {
//   return new Promise(function(resolve) {
//     Api.get(path.api.projects)
//       .then(res => {
//         resolve(res.data)
//       })
//   });
// }

export function createProject(project) {
  return new Promise(function(resolve) {
    Api.post(path.secured.projects, project)
      .then(res => {
        resolve(res.data)
      })
  });
}

export function getProject(projectNo) {
  return new Promise(function(resolve) {
    Api.get(`${path.secured.projects}/${projectNo}`)
      .then(res => {
        resolve(res.data)
      })
  });
}

export function updateProject(project) {
  return new Promise(function(resolve) {
    Api.put(path.secured.projects, project)
      .then(res => {
        resolve(res.data)
      })
  });
}

export function deleteProject(projectNo) {
  return new Promise(function(resolve) {
    Api.delete(`${path.secured.projects}/${projectNo}`)
      .then(res => {
        resolve(res.data)
      })
  });
}

export class Project {
  projectNo = 0;
  projectName = null;
  startedAt = null;
  endedAt = null;
  description = null;
  columns = [];
  writable = true;
}
