import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface TaskManagementStateI {
  toggleTableView: any;
}

const initialState: TaskManagementStateI = {
  toggleTableView: 'listView',
};

const taskManagementSlice = createSlice({
  name: 'task',
  initialState: initialState,
  reducers: {
    setToggleTableView: (state: any, action: PayloadAction<any>) => {
      state.toggleTableView = action?.payload;
    },
  },
});
export const { setToggleTableView } = taskManagementSlice.actions;
export default taskManagementSlice.reducer;
