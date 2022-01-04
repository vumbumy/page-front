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
    records: secured + "/records",
    records_status: secured + "/records/status",
    projects: secured + "/projects",
    events: secured + "/events",
    schedules: secured + "/schedules"
  },
  api: {
    types: "/types",
    types_data_types: "/types/data-columns",
    records: "/records",
    records_status: "/records/status"
  },
  auth: {
    sign: {
      up: '/signup',
      in: '/signin'
    },
    me: secured + "/me"
  }
}
