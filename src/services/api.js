import axios  from 'axios';


const api = axios.create({
    baseURL: 'http://10.0.0.200:3000',
});

export default api