import {Api} from "@/api/common";

import path from "@/config/path";

export function getTicketStatusList(status = null) {
  return new Promise(function(resolve) {
    Api.get(path.api.tickets_status)
      .then(res => {
        resolve(res.data)
      })
  });
}

export function getTicketList(projectNo = null, status = null) {
  return new Promise(function(resolve) {
    Api.get(path.secured.tickets, {
      params: {
        projectNo: projectNo,
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
    Api.get(path.api.tickets)
      .then(res => {
        resolve(res.data)
      })
  });
}

export function createTicket(ticket) {
  return new Promise(function(resolve) {
    Api.post(path.secured.tickets, ticket)
      .then(res => {
        resolve(res.data)
      })
  });
}

export function getTicket(ticketNo) {
  return new Promise(function(resolve) {
    Api.get(`${path.secured.tickets}/${ticketNo}`)
      .then(res => {
        resolve(res.data)
      })
  });
}

export function updateTicketStatus(ticket) {
  return new Promise(function(resolve) {
    Api.put(path.secured.tickets_status, ticket)
      .then(res => {
        resolve(res.data)
      })
  });
}

export function updateTicket(ticket) {
  return new Promise(function(resolve) {
    Api.put(path.secured.tickets, ticket)
      .then(res => {
        resolve(res.data)
      })
  });
}

export function deleteTicket(ticketNo) {
  return new Promise(function(resolve) {
    Api.delete(`${path.secured.tickets}/${ticketNo}`)
      .then(res => {
        resolve(res.data)
      })
  });
}

export class Ticket {

  ticketNo = 0;

  ticketName = null;

  values = null;

  status = null;

  writable = false;

  shared = false;

  constructor(status) {
    console.log(this.ticketNo)

    this.status = status
  }
}

export class Value {
  valueNo = 0;

  typeNo = 0;

  dataValue = null;
}
