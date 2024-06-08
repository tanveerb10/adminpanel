import axios from "axios"

export const apiClient = axios.create({
    baseURL: 'http://165.232.189.68',
    
    Credentials: true,
    headers:{
    'content' : 'application/json',
    'livein-key' : 'livein-key'
},

})
