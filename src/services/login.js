import axios from 'axios'

const url = '/api/login'

const login = credentials => {
  return axios.post(url, credentials)
}

export default {
  login: login,
}
