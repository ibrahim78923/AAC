import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface EmailStateI {
  mailTabType: any;
}

const initialState: EmailStateI = {
  mailTabType: 'inbox',
};

const emailSlice = createSlice({
  name: 'email',
  initialState: initialState,
  reducers: {
    setMailTabType: (state, action: PayloadAction<string>) => {
      state.mailTabType = action.payload;
    },
  },
});
export const { setMailTabType } = emailSlice.actions;
export default emailSlice.reducer;
