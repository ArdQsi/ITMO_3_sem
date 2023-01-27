import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8080/lab4-1.0/api/'
  baseURL: 'http://localhost:8095/lab4-1.0/api/'
});

const entryAPI = {
  async getEntries(token) {
      return axiosInstance.get('entries', {
      headers: {
        // Authorization: 'key ' + token
        //надо как-то из токена достать ключ
        //token = username + key

        key: token.toString()
      }
    });
  },

  async checkEntry(x, y, r, token) {
    return axiosInstance.post('entries', { x, y, r }, {
      headers: {
        // Authorization: 'Bearer ' + token
        key: token.toString()
      }
    });
  },

  async clearEntries(token) {
    return axiosInstance.delete('', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }
}

export default entryAPI;
