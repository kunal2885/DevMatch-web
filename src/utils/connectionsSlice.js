import { createSlice } from "@reduxjs/toolkit";
import stat from "daisyui/components/stat";

const connectionsSlice = createSlice({
    name : "connections",
    initialState : null,
    reducers :{
        addConnections : (state,action)=>{
            return action.payload
        },
        removeConnections : (state,action)=>{
            return null
        }
    }
})

export const {addConnections , removeConnections}= connectionsSlice.actions

export default connectionsSlice.reducer