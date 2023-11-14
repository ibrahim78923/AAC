import { TAuthSlice } from './extra-reducers';

const initialState: TAuthSlice = {
  accessToken: null,
  refreshToken: null,
};

export const setTokens = (state: any, action: any) => {
  state.accessToken = action?.payload?.accessToken;
  state.refreshToken = action?.payload?.refreshToken;
};

export const logout = (state: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  state = initialState;
};
