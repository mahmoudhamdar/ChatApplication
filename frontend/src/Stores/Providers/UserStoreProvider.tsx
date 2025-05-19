"use client"

import React, {createContext, ReactNode, useContext} from 'react';
import {IdStoreState, useIdStore,} from "@/Stores/IdStore"


const UserStoreContext = createContext<IdStoreState | undefined>(undefined);


interface StoreProviderProps {
    children: ReactNode;
}

export const UserStoreProvider: React.FC<StoreProviderProps> = ({children}) => {
    const store = useIdStore();
    return (
        <UserStoreContext.Provider value={store}>
            {children}
        </UserStoreContext.Provider>
    );
};


export const useUser = (): IdStoreState => {
    const context = useContext(UserStoreContext);
    if (context === undefined) {
        throw new Error('useStoreContext must be used within a StoreProvider');
    }
    return context;
};



