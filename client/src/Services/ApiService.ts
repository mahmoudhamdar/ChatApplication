import axios from "axios";


export const api = "http://localhost:5279/api"

export const axiosPrivate =

    axios.create({
       
        headers: {"Content-Type": "application/json"},
        withCredentials: true,
    })
    
    








