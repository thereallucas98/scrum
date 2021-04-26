import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://138.59.36.63:3333/'
  baseURL: 'http://localhost:3333'
});

export default api;