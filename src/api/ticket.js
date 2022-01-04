import {Api} from "@/api/common";

import path from "@/config/path";

export function getTicketStatusList(status = null) {
  return new Promise(function(resolve) {
    Api.get(path.api.records_status)
      .then(res => {
        resolve(res.data)
      })
  });
}

export function getProjectTicketList(projectNo = null, status = null) {
  return new Promise(function(resolve) {
    Api.get(`${path.secured.projects}/${projectNo}/records`, {
      params: {
        status: status
      }
    })
      .then(res => {
        resolve(res.data)
      })
  });
}

export function getPublicTicketList() {
  return new Promise(function(resolve) {
    Api.get(path.api.records)
      .then(res => {
        resolve(res.data)
      })
  });
}

export function getPublicTicket(recordCode) {
  return new Promise(function(resolve) {
    Api.get(`${path.api.records}/${recordCode}`)
      .then(res => {
        resolve(res.data)
      })
  });
}

export function createTicket(record) {
  return new Promise(function(resolve) {
    Api.post(path.secured.records, record)
      .then(res => {
        resolve(res.data)
      })
  });
}

export function getTicket(recordNo) {
  return new Promise(function(resolve) {
    Api.get(`${path.secured.records}/${recordNo}`)
      .then(res => {
        resolve(res.data)
      })
  });
}

export function updateTicketStatus(record) {
  return new Promise(function(resolve) {
    Api.put(path.secured.records_status, record)
      .then(res => {
        resolve(res.data)
      })
  });
}

export function updateTicketPermissions(recordNo, permissions) {
  return new Promise(function(resolve) {
    Api.put(`${path.secured.records}/${recordNo}/permissions`, permissions)
      .then(res => {
        resolve(res.data)
      })
  });
}

export function updateTicket(record) {
  return new Promise(function(resolve) {
    Api.put(path.secured.records, record)
      .then(res => {
        resolve(res.data)
      })
  });
}

export function deleteTicket(recordNo) {
  return new Promise(function(resolve) {
    Api.delete(`${path.secured.records}/${recordNo}`)
      .then(res => {
        resolve(res.data)
      })
  });
}

export class Record {

  recordNo = 0;

  recordName = null;

  recordCode = null;

  values = null;

  status = null;

  writable = true;

  userPermissions = [];
  groupPermissions = [];

  constructor(status) {
    this.status = status
  }
}

export class Value {
  valueNo = 0;

  typeNo = 0;

  dataValue = null;
}
