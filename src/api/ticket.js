import {Api} from "@/api/common";

import path from "@/config/path";

export function getTicketList() {
  return new Promise(function(resolve) {
    Api.get(path.secured.tickets)
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
