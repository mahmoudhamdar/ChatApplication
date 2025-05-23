"use client"
import useSWR, {useSWRConfig} from "swr";
import {api, axiosPrivate} from "@/Services/ApiService";



export const GETT = () => {
    const { cache, mutate: globalMutate } = useSWRConfig()

    // Get the cached value directly
    const cachedValue = cache.get(`${api}/user/login`)

    // For debugging
    console.log("GETT component cache read:", cachedValue)

    // Access using useSWR for better reactivity
    const { data: user } = useSWR(`${api}/user/login`, null, {
        // Don't fetch, just use the cache
        shouldRetryOnError: false,
        revalidateOnFocus: false,
        revalidateOnMount: false
    })

    return <div>
        <h4>Reading from Cache:</h4>
        <p>Direct cache access: {cachedValue?.data.username}</p>
        <p>Via useSWR hook: {user?.username}</p>
        <button onClick={() => console.log("Full cache value:", cachedValue)}>
            Log Full Cache
        </button>
    </div>
}