const admin = '/admin'
const secured = '/secured';

export default {
  baseURL: process.env.VUE_APP_API_BASE_URL,
  admin: {
    users: secured + admin + "/users"
  },
  sign: {
    up: '/sign/up',
    in: '/sign/in'
  }
}
