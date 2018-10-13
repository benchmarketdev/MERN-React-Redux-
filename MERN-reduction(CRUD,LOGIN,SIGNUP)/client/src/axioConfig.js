import axios from 'axios';
const axiosApi = axios.create({
    baseURL:'http://localhost:3003',
    timelien:10000,
    withCredentials:true,
});
export default axiosApi;