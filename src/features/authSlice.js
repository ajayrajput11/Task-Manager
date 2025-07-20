
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  users: JSON.parse(localStorage.getItem("users")) || [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUp: (state, action) => {
    
    
        state.users.push(action.payload)
      localStorage.setItem("users", JSON.stringify(state.users));
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload))
    },
    
    logIn: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    

resetPassword: (state, action) => {
  const { email, newPassword } = action.payload;
  const user = state.users.find((u) => u.email === email);
  if (user) {
    user.password = newPassword;
  }
},
    logOut: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
    updateProfile: (state, action) => {
      const index = state.users.findIndex(user => user.email === action.payload.email);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
        if (state.currentUser?.email === action.payload.email) {
          state.currentUser = { ...state.currentUser, ...action.payload };
        }
        localStorage.setItem("users", JSON.stringify(state.users));
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
      }
    }
  },
});

export const { setProfile,signUp, logIn, logOut, updateProfile,resetPassword } = authSlice.actions;
export default authSlice.reducer;
