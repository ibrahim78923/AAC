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
  currentForwardMessage: any;
  CurrentForwardAttachments: any;
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
  currentForwardMessage: '',
  CurrentForwardAttachments: '',
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
        state.gmailList = [...state?.gmailList, ...uniqueMails];
      }
    },
    setUpdateGmailList: (state, action: PayloadAction<any>) => {
      state.gmailList = state?.gmailList.map((item: any) =>
        item.id === action?.payload?.id
          ? { ...item, labelIds: action?.payload?.labelIds }
          : item,
      );
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
    setCurrentForwardMessage: (state, action: PayloadAction<any>) => {
      state.currentForwardMessage = action?.payload;
    },
    setCurrentForwardAttachments: (state, action: PayloadAction<any>) => {
      state.CurrentForwardAttachments = action?.payload;
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
  setCurrentForwardMessage,
  setUpdateGmailList,
  setCurrentForwardAttachments,
} = gmailSlice.actions;
export default gmailSlice.reducer;
