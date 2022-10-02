import { login, logout } from '../firebase/authentication'

class User {
  id = ''
  username = ''

  login = async () => {
    await login()
  }

  logout = async () => {
    await logout()
  }
}

export default new User()
