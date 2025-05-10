

import {useUserStoreContext} from "@/Stores/Providers/UserStoreProvider";

export const UseUser = () => {

    const {user,setUser} = useUserStoreContext()
   
   
    return {user,setUser}
};