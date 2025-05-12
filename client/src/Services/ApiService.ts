import axios from "axios";


export const api = "http://localhost:5169/api"

export const axiosPrivate =

    axios.create({
       
        headers: {"Content-Type": "application/json"},
        withCredentials: true,
    })
    
    








