import axios from 'axios'

const HTTP = axios.create(
    {
        baseURL: 'http://localhost:5000/api',
    }
)
HTTP.interceptors.request
HTTP.interceptors.response
export default HTTP
