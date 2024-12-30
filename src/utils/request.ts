import axios from 'axios';

const apiService = axios.create({
  baseURL: 'https://back-taskmanager-lk0r.onrender.com/',
  timeout: 120000,
});

export default apiService;
