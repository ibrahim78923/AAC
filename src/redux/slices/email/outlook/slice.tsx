import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface EmailStateI {
  mailTabType: any;
  selectedRecords: any;
  activeRecord: any;
  currentEmailAssets: any;
  loggedInState: any;
  mailList: any;
  mailDraftList: any;
  searchTerm: string;
  mailCurrentPage: any;
  breakScrollOperation: boolean;
}

const initialState: EmailStateI = {
  mailTabType: {
    display_name: 'INBOX',
  },
  selectedRecords: [],
  activeRecord: {},
  currentEmailAssets: {},
  loggedInState: 'nabeel.ahmed@consultancyoutfit.co.uk',
  mailList: [] || '',
  mailDraftList: {},
  searchTerm: '',
  mailCurrentPage: 1,
  breakScrollOperation: false,
};

const outlookSlice = createSlice({
  name: 'outlook',
  initialState: initialState,
  reducers: {
    setMailTabType: (state, action: PayloadAction<any>) => {
      state.mailTabType = action?.payload;
    },
    setBreakScrollOperation: (state, action: PayloadAction<any>) => {
      state.breakScrollOperation = action?.payload;
    },
    setMailCurrentPage: (state, action: PayloadAction<any>) => {
      state.mailCurrentPage = action?.payload;
    },
    setSearchTerm: (state, action: PayloadAction<any>) => {
      state.searchTerm = action?.payload;
    },
    setSelectedRecords: (state, action: PayloadAction<any>) => {
      state.selectedRecords = action?.payload;
    },
    setMailList: (state, action: PayloadAction<any>) => {
      if (action.payload === 'clear') {
        state.mailList = [];
      } else {
        const newMails = Object.values(action?.payload);
        const existingMailIds = new Set(
          state.mailList?.map((mail: any) => mail?.id),
        );

        const uniqueMails = newMails?.filter(
          (mail: any) => !existingMailIds?.has(mail?.id),
        );

        state.mailList = [...state.mailList, ...uniqueMails];
      }
    },
    setMailListSearch: (state, action: PayloadAction<any>) => {
      state.mailList = [];
      state.mailList = action.payload;
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
  setSearchTerm,
  setMailCurrentPage,
  setBreakScrollOperation,
} = outlookSlice.actions;
export default outlookSlice.reducer;
