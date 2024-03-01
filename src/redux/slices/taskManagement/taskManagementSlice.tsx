import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface TaskManagementStateI {
  toggleTableView: any;
  selectedTaskIds: any;

  contactsSelectedIds: any;
  companiesSelectedIds: any;
  dealsSelectedIds: any;
  ticketsSelectedIds: any;
}

const initialState: TaskManagementStateI = {
  toggleTableView: 'listView',
  selectedTaskIds: [],

  contactsSelectedIds: [],
  companiesSelectedIds: [],
  dealsSelectedIds: [],
  ticketsSelectedIds: [],
};

const taskManagementSlice = createSlice({
  name: 'task',
  initialState: initialState,
  reducers: {
    setToggleTableView: (state: any, action: PayloadAction<any>) => {
      state.toggleTableView = action?.payload;
    },
    setSelectedTaskIds: (state: any, action: PayloadAction<any>) => {
      state.selectedTaskIds = action?.payload;
    },

    setContactsSelectedIds: (state: any, action: PayloadAction<any>) => {
      const newItem = action?.payload;
      const existingItemIndex = state?.contactsSelectedIds?.findIndex(
        (item: any) => item?.id === newItem?.id,
      );

      if (existingItemIndex !== -1) {
        state.contactsSelectedIds?.splice(existingItemIndex, 1);
      } else {
        state.contactsSelectedIds?.push(newItem);
      }
    },
    setCompaniesSelectedIds: (state: any, action: PayloadAction<any>) => {
      const newItem = action?.payload;
      const existingItemIndex = state?.companiesSelectedIds?.findIndex(
        (item: any) => item?.id === newItem?.id,
      );

      if (existingItemIndex !== -1) {
        state?.companiesSelectedIds?.splice(existingItemIndex, 1);
      } else {
        state?.companiesSelectedIds?.push(newItem);
      }
    },
    setDealsSelectedIds: (state: any, action: PayloadAction<any>) => {
      const newItem = action?.payload;
      const existingItemIndex = state?.dealsSelectedIds?.findIndex(
        (item: any) => item?.id === newItem?.id,
      );

      if (existingItemIndex !== -1) {
        state?.dealsSelectedIds?.splice(existingItemIndex, 1);
      } else {
        state?.dealsSelectedIds?.push(newItem);
      }
    },
    setTicketsSelectedIds: (state: any, action: PayloadAction<any>) => {
      const newItem = action?.payload;
      const existingItemIndex = state?.ticketsSelectedIds?.findIndex(
        (item: any) => item?.id === newItem?.id,
      );

      if (existingItemIndex !== -1) {
        state?.ticketsSelectedIds?.splice(existingItemIndex, 1);
      } else {
        state?.ticketsSelectedIds?.push(newItem);
      }
    },
  },
});
export const {
  setToggleTableView,
  setSelectedTaskIds,
  setContactsSelectedIds,
  setCompaniesSelectedIds,
  setDealsSelectedIds,
  setTicketsSelectedIds,
} = taskManagementSlice.actions;
export default taskManagementSlice.reducer;
