import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8080/lab4-1.0/api/'
  baseURL: 'http://localhost:8095/lab4-1.0/api/'
});

const authAPI = {
  login(username, password) {
    return axiosInstance.post('login', { username, password });
  },
  register(username, password) {
    return axiosInstance.post('register', { username, password });
    },
}

export default authAPI;
