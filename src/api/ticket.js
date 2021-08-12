import {Api} from "@/api/common";

import path from "@/config/path";

export function getTicketList() {
  return new Promise(function(resolve) {
    Api.get(path.tickets)
      .then(res => {
        resolve(res.data)
      })
  });
}

export function createTicket(ticket) {
  return new Promise(function(resolve) {
    Api.post(path.tickets, ticket)
      .then(res => {
        resolve(res.data)
      })
  });
}

export function updateTicket(ticket) {
  return new Promise(function(resolve) {
    Api.put(path.tickets, ticket)
      .then(res => {
        resolve(res.data)
      })
  });
}
