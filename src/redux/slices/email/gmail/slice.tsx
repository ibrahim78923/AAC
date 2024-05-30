import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface EmailStateI {
  gmailTabType: any;
  selectedGmailRecords: any;
  activeGmailRecord: any;
  currentEmailAssets: any;
  loggedInState: any;
  gmailList: any;
  mailDraftList: any;
}

const initialState: EmailStateI = {
  gmailTabType: {
    name: 'INBOX',
  },
  selectedGmailRecords: [],
  activeGmailRecord: {},
  currentEmailAssets: {},
  loggedInState: 'umarkhattab555@zohomail.com',
  gmailList: {},
  mailDraftList: {},
};

const gmailSlice = createSlice({
  name: 'gmail',
  initialState: initialState,
  reducers: {
    setGmailTabType: (state, action: PayloadAction<any>) => {
      state.gmailTabType = action?.payload;
    },
    setSelectedGmailRecords: (state, action: PayloadAction<any>) => {
      state.selectedGmailRecords = action?.payload;
    },
    setGmailList: (state, action: PayloadAction<any>) => {
      state.gmailList = action?.payload;
    },
    setGmailDraftList: (state, action: PayloadAction<any>) => {
      state.mailDraftList = action?.payload;
    },
    setActiveGmailRecord: (state, action: PayloadAction<any>) => {
      state.activeGmailRecord = action?.payload;
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
  setGmailTabType,
  setLoggedInState,
  setSelectedGmailRecords,
  setActiveGmailRecord,
  setCurrentEmailAssets,
  setGmailList,
  setGmailDraftList,
} = gmailSlice.actions;
export default gmailSlice.reducer;
