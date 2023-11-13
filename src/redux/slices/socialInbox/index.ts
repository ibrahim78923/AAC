import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SocialInboxI {
  socialInboxState: any;
}

const initialState: SocialInboxI = {
  socialInboxState: 'Teams',
};

const SocialInboxSlice = createSlice({
  name: 'chat',
  initialState: initialState,
  reducers: {
    setSocialInboxMode: (state: any, action: PayloadAction<any>) => {
      state.socialInboxState = action.payload;
    },
  },
});
export const { setSocialInboxMode } = SocialInboxSlice.actions;
export default SocialInboxSlice.reducer;
