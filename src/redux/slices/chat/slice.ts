import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ChatStateI {
  chatModeState: any;
}

const initialState: ChatStateI = {
  chatModeState: 'personalChat',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState,
  reducers: {
    setChatModes: (state: any, action: PayloadAction<any>) => {
      state.chatModeState = action.payload;
    },
  },
});
export const { setChatModes } = chatSlice.actions;
export default chatSlice.reducer;
