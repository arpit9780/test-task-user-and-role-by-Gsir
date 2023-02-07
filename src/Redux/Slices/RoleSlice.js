import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    roleList: [],
    error: "",
    status: ""
}

const RoleSlice = createSlice({
    name: "RoleSlice",
    initialState,
    reducers: {
        roleData(state, action) {
            const data = state.roleList
            state.roleList = [...data,action.payload]
        },
        deleteRoleFromList(state, action) {
            state.roleList.splice(action.payload,1)
        },
        EditRoleFromList(state, action) {
            state.roleList.splice(action.payload[0],1,action.payload[1])
        }
    }
})
export const {roleData, deleteRoleFromList, EditRoleFromList } = RoleSlice.actions
export default RoleSlice.reducer;