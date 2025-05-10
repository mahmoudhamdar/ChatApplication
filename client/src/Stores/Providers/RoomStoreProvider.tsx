"use client"
import {createContext, ReactNode, useContext} from "react";
import {RoomStoreState, useRoomStore} from "@/Stores/RoomStore";


const RoomStoreContext = createContext<RoomStoreState | undefined>(undefined);

interface RoomStoreProviderProps {
    children: ReactNode
}

export const RoomStoreProvider: React.FC<RoomStoreProviderProps> = ({children}) => {


    const store = useRoomStore();

    return <RoomStoreContext.Provider value={store}>{children}</RoomStoreContext.Provider>;
}

export const useRoomStoreContext = (): RoomStoreState => {
    const context = useContext(RoomStoreContext);
    if (context === undefined) {
        throw new Error('useStoreContext must be used within a StoreProvider');
    }

    return context;
}




