"use client"
import {UserProfileToken} from "@/Models/User";
import {api, axiosPrivate} from "@/Services/ApiService";
import useSWR, { useSWRConfig } from "swr";
import {useEffect} from "react";


export const Postt =()=>{

  const  username="Ali"
  const  password="Vendetta007*"
  // Get access to the global cache
  const { cache, mutate: globalMutate } = useSWRConfig()

    const  login = async ()=>{

      return   await axiosPrivate.post(`${api}/user/login`, {
            username: username,
            password: password
        }).then((res)=>{return res.data })
    }
    
    useEffect(()=>{
        
        console.log(login)
            
        // Example: Reading a value directly from the cache
        const cachedData = cache.get(`${api}/users/login`)
        console.log("Data from cache:", cachedData)
    }, [cache])


   const {data:user,mutate} = useSWR<UserProfileToken>(`${api}/user/login`
        , async ()=>{
            const res = await axiosPrivate.post(`${api}/user/login`, {
                username: username,
                password: password
            }).then((res)=>{return res.data})

            // This will be undefined on first load
            // Only logs a value after data is fetched at least once
            console.log("Current cached user:", user);

            return res;  // Return the response directly
        },
        {
          // Add this to improve caching behavior
          revalidateIfStale: false,
          dedupingInterval: 10000 // Don't make duplicate requests within 10 seconds
        }
   )

    // Example function to manually read and display cache
    const readCacheAndDisplay = () => {
        const cachedValue = cache.get(`${api}/user/login`) // Fix: use user/login not users/login
        console.log("Cache read result:", cachedValue)
        alert(cachedValue ? JSON.stringify(cachedValue) : "Cache is empty")
        return cachedValue
    }

    // Call this function after a successful login to populate the cache
    const populateCache = async () => {
        const loginData = await login();
        // Manually update the global cache
        globalMutate(`${api}/user/login`, loginData, false);
        console.log("Cache populated with:", loginData);
    }
    
    return (
        <div>
            <div className="message-bubble">{user?.username}</div>
            <button onClick={readCacheAndDisplay}>Read From Cache</button>
            <button onClick={populateCache}>Populate Cache First</button>
        </div>
    )
}