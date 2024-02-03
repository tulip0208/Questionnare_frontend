import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../app/config";
import lang from "../lang/lang";

const server_url = config.server_url;

export const view = createAsyncThunk("/view", async () => {
  const response = await axios.get(`${server_url}/store/view`);
  return response.data;
});

export const createOrUpdate = createAsyncThunk(
  "/create_or_update",
  async (payload) => {
    const response = await axios.post(`${server_url}/store/create_or_update`, payload);
    return response.data;
  }
);

export const deleteStore = createAsyncThunk(
  "/delete",
  async (payload) => {
    const response = await axios.post(`${server_url}/store/delete`, payload);
    return response.data;
  }
);

export const storeSlice = createSlice({
  name: "store",
  initialState: {
    isLoading: false,
    store: null,
    status: null,
    error: null
  },
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
    resetStatus: (state) => {
      state.status = ""
    }
  },
  extraReducers: {
    [view.pending]: (state) => {
      state.isLoading = true;
    },
    [view.fulfilled]: (state, { payload }) => {
        state.store = payload.store;
        state.isLoading = false;
    },
    [view.rejected]: (state, error) => {
      state.status = lang("en", "failed")
      state.isLoading = false;
    },

    [createOrUpdate.pending]: (state, { payload }) => {
      state.isLoading = true;
      state.status = ""
    },
    [createOrUpdate.fulfilled]: (state, { payload }) => {
      console.log(payload.message)
      state.status = payload.message
      state.isLoading = false;
    },
    [createOrUpdate.rejected]: (state, error) => {
      console.log(error)
      state.status = lang("en", "failed")
      state.isLoading = false;
    },

    [deleteStore.pending]: (state) => {
      state.status = ""
      state.isLoading = true;
    },
    [deleteStore.fulfilled]: (state, { payload }) => {
      state.status = payload.message
      state.isLoading = false;
    },
    [deleteStore.rejected]: (state, error) => {
      state.status = lang("en", "failed")
      state.isLoading = false;
    },
  },
});
export const { resetError, resetStatus } = storeSlice.actions;
export default storeSlice.reducer;
