import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const server_url = "http://localhost:8080";

export const signin = createAsyncThunk("/login", async (payload) => {
  try {
    const response = await axios.get(`${server_url}/login?username=${payload.username}&password=${payload.password}`);
    return response.data;
  } catch (e) {
    if (e.response) {
      return e.response.data;
    }
    return { message: "Server is not running correctly." };
  }
});

export const setUserInfo = createAsyncThunk(
  "/putpassword",
  async (payload) => {
    const response = await axios.put("/putpassword", payload);
    return response.data;
  }
);

export const getUser = createAsyncThunk("/tokenLogin", async () => {
  const response = await axios.post(`${server_url}/tokenLogin`);
  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    user: null,
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    getToken: (state) => {
      state.token = localStorage.getItem("token");
    },
    logOut: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      state.user = null;
    },
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: {
    [signin.pending]: (state) => {
      state.isLoading = true;
    },
    [signin.fulfilled]: (state, { payload }) => {
      if (payload.token) {
        axios.defaults.headers.common["Authorization"] = payload.token;
        localStorage.setItem("token", payload.token);
        state.user = payload.user;
        state.token = payload.token;
        state.isLoading = false;
      } else {
        state.error = payload.message;
        state.isLoading = false;
      }
    },
    [signin.rejected]: (state, payload) => {
      console.log("rejected error")
      state.error = payload.message;
      state.isLoading = false;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      localStorage.setItem("token", payload.token);
      state.user = payload.user;
    },
    [setUserInfo.fulfilled]: (state, { payload }) => {
      if (payload.err != 1) {
        state.user = payload.data;
      }
    },
    [setUserInfo.rejected]: (state, payload) => {
      state.error = "User not found";
      state.isLoading = false;
    },
  },
});
export const { getToken, logOut, resetError } = userSlice.actions;
export default userSlice.reducer;
