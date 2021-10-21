const admin = '/admin'
const secured = '/secured';

export default {
  baseURL: process.env.VUE_APP_API_BASE_URL,
  admin: {
    users: secured + admin + "/users",
    groups: secured + admin + "/groups",
  },
  secured: {
    users: secured + "/users",
    groups: secured + "/groups",
    tickets: secured + "/tickets",
    tickets_status: secured + "/tickets/status",
    projects: secured + "/projects"
  },
  api: {
    types: "/types",
    types_data_types: "/types/data-types",
    tickets: "/tickets",
    tickets_status: "/tickets/status"
  },
  auth: {
    sign: {
      up: '/sign/up',
      in: '/sign/in'
    },
    me: secured + "/me"
  }
}
