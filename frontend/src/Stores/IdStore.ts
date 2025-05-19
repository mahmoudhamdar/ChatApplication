

import {create, ExtractState} from 'zustand'
import {combine} from "zustand/middleware";
import {UserProfileToken} from "@/Models/User";



interface IdState {
    user: UserProfileToken;
    setUser: (user: UserProfileToken) => void;
}


export type IdStoreState = ExtractState<typeof useIdStore>
export const useIdStore = create<IdState>()(
    combine({
            user: {
                id: "", username: "", email: "", token: ""
            }
        }, (set) => ({
            setUser: (user: UserProfileToken) => set(({user: user}))
        })
    ))



