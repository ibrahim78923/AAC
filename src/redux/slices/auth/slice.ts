import { createSlice } from '@reduxjs/toolkit';
import {
  TAuthSlice,
  loginSuccess,
  permissionsUpdate,
  registerSuccess,
} from './extra-reducers';
import { setTokens, logout } from './reducers';
import { authAPI } from '@/services/auth';

const initialState: TAuthSlice = {
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthTokens: setTokens,
    logout,
  },
  extraReducers: (builder) => {
    builder
      //Login Matchers
      .addMatcher(authAPI?.endpoints?.authLogin?.matchFulfilled, loginSuccess)
      //Register Matchers
      .addMatcher(authAPI?.endpoints?.signUp?.matchFulfilled, registerSuccess)
      //permissions Matchers
      .addMatcher(
        authAPI?.endpoints?.getAuthMyAccount?.matchFulfilled,
        permissionsUpdate,
      );
  },
});

export const { setAuthTokens } = authSlice?.actions;
export default authSlice.reducer;
