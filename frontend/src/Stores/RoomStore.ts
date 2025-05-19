
import {create} from "zustand";
import {combine} from "zustand/middleware";
import {ExtractState} from "zustand/index";


interface Room {
    roomId: string;
    roomName: string;
    setRoomId: (id: string) => void;
    setRoomName: (name: string) => void;
}

export type RoomStoreState = ExtractState<typeof useRoomStore>
export const useRoomStore = create<Room>()(
    combine({roomId: "", roomName: ""}, (set) => ({
            setRoomId: (id: string) => set(({roomId: id})),
            setRoomName: (name: string) => set({roomName: name}),
        })
    ))




