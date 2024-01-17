import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface TaskManagementStateI {
  toggleTableView: any;
  selectedTaskIds: any;
}

const initialState: TaskManagementStateI = {
  toggleTableView: 'listView',
  selectedTaskIds: [],
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
  },
});
export const { setToggleTableView, setSelectedTaskIds } =
  taskManagementSlice.actions;
export default taskManagementSlice.reducer;
