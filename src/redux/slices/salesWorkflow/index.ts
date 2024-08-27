import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  testWorkflowBody: {},
};

const salesWorkflowSlice = createSlice({
  name: 'salesWorkflow',
  initialState,
  reducers: {
    setTestWorkflowBody: (state, action) => {
      state.testWorkflowBody = action?.payload;
    },
  },
});

export const { setTestWorkflowBody } = salesWorkflowSlice?.actions;
export default salesWorkflowSlice.reducer;
