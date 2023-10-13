import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (_, { getState }) => {
    const token = getState().auth.token;
    const response = await axios.get(
      "https://sara7aiti.onrender.com/api/v1/message",
      {
        headers: {
          token,
        },
      }
    );
    return response.data.allMessages;
  }
);

const initialState = {
  messages: [],
  status: "idle",
  error: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectMessages = (state) => state.messages.messages; // Selector to get messages from the state

export default messagesSlice.reducer;
