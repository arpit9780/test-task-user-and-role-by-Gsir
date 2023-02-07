import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    usersList: [],
    error: "",
    status: ""
}

const UserSlice = createSlice({
    name: "UserSlice",
    initialState,
    reducers: {
        userData(state, action) {
            const data = state.usersList
            state.usersList = [...data, action.payload]
        },
        deleteUserFromList(state, action) {
            state.usersList.splice(action.payload,1)
        },
        editUserFromList(state, action) {
            state.usersList.splice(action.payload[0],1,action.payload[1])
        }
    }
})
export const {userData, deleteUserFromList, editUserFromList} = UserSlice.actions
export default UserSlice.reducer;