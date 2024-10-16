import {createSlice} from "@reduxjs/toolkit"


const initialState={
    username:"",
    email:"",
    mobile:"",
    password:"",
    loggedUser:[],
    userBookings:[]
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        inputHandler: function (state, action) {
            state[action.payload.name] = action.payload.value;
          },
          clearInputs: function (state, action) {
            state.username = "",
            state.email = "",
            state.mobile = "",
            state.password = ""
          },
          setLoggedUser :function(state,action) {
            state.loggedUser = action.payload
          },
          setUserBookings : function(state,action){
            state.userBookings  = action.payload
          }
    }
})

export const {inputHandler,clearInputs,setLoggedUser,setUserBookings} = userSlice.actions  
export default userSlice.reducer;
