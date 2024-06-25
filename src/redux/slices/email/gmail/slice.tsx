import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface EmailStateI {
  gmailTabType: any;
  selectedGmailRecords: any;
  activeGmailRecord: any;
  currentGmailAssets: any;
  loggedInState: any;
  gmailList: any;
  mailDraftList: any;
  gmailSearch: any;
  gmailCurrentPage: any;
}

const initialState: EmailStateI = {
  gmailTabType: {
    name: 'INBOX',
  },
  selectedGmailRecords: [],
  activeGmailRecord: {},
  currentGmailAssets: {},
  loggedInState: 'umarkhattab555@zohomail.com',
  gmailList: [] || '',
  mailDraftList: {},
  gmailSearch: '',
  gmailCurrentPage: '',
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
      if (action.payload === 'clear') {
        state.gmailList = [];
      } else {
        const newMails = Object.values(action?.payload);
        const existingMailIds = new Set(
          state.gmailList?.map((mail: any) => mail?.id),
        );

        const uniqueMails = newMails?.filter(
          (mail: any) => !existingMailIds?.has(mail?.id),
        );
        state.gmailList = [...state.gmailList, ...uniqueMails];
      }
    },

    setGmailDraftList: (state, action: PayloadAction<any>) => {
      state.mailDraftList = action?.payload;
    },
    setActiveGmailRecord: (state, action: PayloadAction<any>) => {
      state.activeGmailRecord = action?.payload;
    },
    setCurrentGmailAssets: (state, action: PayloadAction<any>) => {
      state.currentGmailAssets = action?.payload;
    },
    setLoggedInState: (state, action: PayloadAction<any>) => {
      state.currentGmailAssets = action?.payload;
    },
    setGmailSearch: (state, action: PayloadAction<any>) => {
      state.gmailSearch = action?.payload;
    },
    setGmailCurrentPage: (state, action: PayloadAction<any>) => {
      state.gmailCurrentPage = action?.payload;
    },
  },
});
export const {
  setGmailTabType,
  setLoggedInState,
  setSelectedGmailRecords,
  setActiveGmailRecord,
  setCurrentGmailAssets,
  setGmailList,
  setGmailDraftList,
  setGmailSearch,
  setGmailCurrentPage,
} = gmailSlice.actions;
export default gmailSlice.reducer;
