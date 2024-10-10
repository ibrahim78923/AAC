import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface NotificationsStateI {
  notificationsData: string[];
}

const initialState: NotificationsStateI = {
  notificationsData: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: initialState,
  reducers: {
    setNotifications(state, action: PayloadAction<any>) {
      if (Array.isArray(action?.payload)) {
        state.notificationsData = action?.payload;
      } else {
        state.notificationsData?.unshift(action?.payload);
      }
    },
  },
});

export const { setNotifications } = notificationsSlice.actions;

export default notificationsSlice.reducer;
