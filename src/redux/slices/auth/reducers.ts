import { TAuthSlice } from './extra-reducers';

const initialState: TAuthSlice = {
  authToken: null,
  refreshToken: null,
};

export const setTokens = (state: any, action: any) => {
  state.authToken = action.payload.authToken;
  state.refreshToken = action.payload.refreshToken;
};

export const logout = (state: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  state = initialState;
};
