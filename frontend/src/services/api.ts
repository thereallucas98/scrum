import axios from 'axios';

const api = axios.create({
  baseURL: 'http://177.46.73.164:3333/'
  // baseURL: 'http://localhost:3333'
});

export default api;