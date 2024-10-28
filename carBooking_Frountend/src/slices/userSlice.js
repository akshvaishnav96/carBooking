import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  mobile: "",
  password: "",
  loggedUser: "",
  role: "",
  userBookings: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    inputHandler: function (state, action) {
      state[action.payload.name] = action.payload.value;
    },
    clearInputs: function (state, action) {
      (state.username = ""),
        (state.email = ""),
        (state.mobile = ""),
        (state.password = "");
    },
    setLoggedUser: function (state, action) {
      state.loggedUser = action.payload;
    },
    setUserBookings: function (state, action) {
      state.userBookings = action.payload;
    },
    setEmail: function (state, action) {
      state.email = action.payload;
    },
    setMobile: function (state, action) {
      state.mobile = action.payload;
    },
    setUsername: function (state, action) {
      state.username = action.payload;
    },
    setrole: function (state, action) {
      state.role = action.payload;
    },
  },
});

export const {
  inputHandler,
  clearInputs,
  setLoggedUser,
  setUserBookings,
  setEmail,
  setMobile,
  setUsername,
  setrole,
} = userSlice.actions;
export default userSlice.reducer;
