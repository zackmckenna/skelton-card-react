import axios from 'axios'

const url = '/api/users'

const createAccount = async newUserObject => {
  const response = await axios.post(url, newUserObject)
  return response.data
}

export default {
  createAccount
}
