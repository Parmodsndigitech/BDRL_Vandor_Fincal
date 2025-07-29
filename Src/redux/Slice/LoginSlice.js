import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  userData: "", // List of isLogin
  truckData:""
};

const LoginSlice = createSlice({
  name: "isLogin",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setTruckData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setLogin, setUserData,setTruckData } = LoginSlice.actions;

export default LoginSlice.reducer;
