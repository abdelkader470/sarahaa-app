import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ messageContent, receivedId }) => {
    const data = {
      messageContent,
      receivedId,
    };
    const response = await axios.post(
      "https://sara7aiti.onrender.com/api/v1/message",
      data
    );
    return response.data; // You can return the message or any other data you need
  }
);

const initialState = {
  sendingStatus: "idle", // You can add more status like "loading", "succeeded", "failed"
  sentMessage: null,
  error: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.sendingStatus = "loading";
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sendingStatus = "succeeded";
        state.sentMessage = action.payload;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sendingStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export default messagesSlice.reducer;
