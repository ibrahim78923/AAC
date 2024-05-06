import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface EmailStateI {
  mailTabType: any;
  selectedRecords: any;
  activeRecord: any;
}

const initialState: EmailStateI = {
  mailTabType: {
    display_name: 'INBOX',
  },
  selectedRecords: [],
  activeRecord: {},
};

const emailSlice = createSlice({
  name: 'email',
  initialState: initialState,
  reducers: {
    setMailTabType: (state, action: PayloadAction<string>) => {
      state.mailTabType = action?.payload;
    },
    setSelectedRecords: (state, action: PayloadAction<any>) => {
      state.selectedRecords = action?.payload;
    },
    setActiveRecord: (state, action: PayloadAction<any>) => {
      state.activeRecord = action?.payload;
    },
  },
});
export const { setMailTabType, setSelectedRecords, setActiveRecord } =
  emailSlice.actions;
export default emailSlice.reducer;
