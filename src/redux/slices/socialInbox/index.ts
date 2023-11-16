import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SocialInboxI {
  socialInboxState: any;
}

const initialState: SocialInboxI = {
  socialInboxState: 'TeamChannel',
};

const SocialInboxSlice = createSlice({
  name: 'SocialInbox',
  initialState: initialState,
  reducers: {
    setSocialInboxMode: (state: any, action: PayloadAction<any>) => {
      state.socialInboxState = action?.payload;
    },
  },
});
export const { setSocialInboxMode } = SocialInboxSlice?.actions;
export default SocialInboxSlice.reducer;
