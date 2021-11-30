import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL: '',
  timeout: 8000
})

export const atlasApi = Axios.create({
  baseURL: 'https://api.boardgameatlas.com/api',
  timeout: 8000
})

  // client_id: RhH4WBOfK3
  // client_secret: b4cef4fcee7b31bdd06a80a1cebaaa98