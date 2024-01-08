import axios from 'axios'

const HTTP = axios.create(
    {
        baseURL: 'http://localhost:5000/api'
    }
)
export default HTTP
