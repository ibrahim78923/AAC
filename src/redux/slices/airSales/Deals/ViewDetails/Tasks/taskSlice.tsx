import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface TaskManagementStateI {
  selectedDealsTaskIds: any;
}

const initialState: TaskManagementStateI = {
  selectedDealsTaskIds: [],
};

const dealsTaskSlice = createSlice({
  name: 'task_deals',
  initialState: initialState,
  reducers: {
    setSelectedDealsTaskIds: (state: any, action: PayloadAction<any>) => {
      // console.log("action?.payload;",action?.payload)
      state.selectedDealsTaskIds = action?.payload;
    },
  },
});
export const { setSelectedDealsTaskIds } = dealsTaskSlice.actions;
export default dealsTaskSlice.reducer;
