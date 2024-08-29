import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  testServicesWorkflowBody: {},
};

const servicesWorkflowSlice = createSlice({
  name: 'servicesWorkflow',
  initialState,
  reducers: {
    setTestServicesWorkflowBody: (state, action) => {
      state.testServicesWorkflowBody = action?.payload;
    },
  },
});

export const { setTestServicesWorkflowBody } = servicesWorkflowSlice.actions;
export default servicesWorkflowSlice.reducer;
