import axios from "axios";


 const api = axios.create({
    // baseURL: " https://276c-125-20-216-178.ngrok-free.app/api",
    baseURL:"http://localhost:8000/api"
    
})
export default api;