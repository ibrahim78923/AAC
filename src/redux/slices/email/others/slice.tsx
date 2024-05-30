import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface EmailStateI {
  mailTabType: any;
  selectedRecords: any;
  activeRecord: any;
  currentEmailAssets: any;
  loggedInState: any;
  mailList: any;
  mailDraftList: any;
}

const initialState: EmailStateI = {
  mailTabType: {
    display_name: 'INBOX',
  },
  selectedRecords: [],
  activeRecord: {},
  currentEmailAssets: {},
  loggedInState: 'umarkhattab555@zohomail.com',
  mailList: {},
  mailDraftList: {},
};

const outlookSlice = createSlice({
  name: 'outlook',
  initialState: initialState,
  reducers: {
    setMailTabType: (state, action: PayloadAction<any>) => {
      state.mailTabType = action?.payload;
    },
    setSelectedRecords: (state, action: PayloadAction<any>) => {
      state.selectedRecords = action?.payload;
    },
    setMailList: (state, action: PayloadAction<any>) => {
      state.mailList = action?.payload;
    },
    setMailDraftList: (state, action: PayloadAction<any>) => {
      state.mailDraftList = action?.payload;
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
  setMailList,
  setMailDraftList,
} = outlookSlice.actions;
export default outlookSlice.reducer;
