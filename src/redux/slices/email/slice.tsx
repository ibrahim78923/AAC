import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface EmailStateI {
  mailTabType: any;
  selectedRecords: any;
  activeRecord: any;
  currentEmailAssets: any;
  loggedInState: any;
}

const initialState: EmailStateI = {
  mailTabType: {
    display_name: 'INBOX',
  },
  selectedRecords: [],
  activeRecord: {},
  currentEmailAssets: {},
  loggedInState: 'umarkhattab555@zohomail.com',
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
    setCurrentEmailAssets: (state, action: PayloadAction<any>) => {
      state.currentEmailAssets = action?.payload;
    },
    setLoggedInState: (state, action: PayloadAction<any>) => {
      state.currentEmailAssets = action?.payload;
    },
  },
});
export const {
  setMailTabType,
  setLoggedInState,
  setSelectedRecords,
  setActiveRecord,
  setCurrentEmailAssets,
} = emailSlice.actions;
export default emailSlice.reducer;
