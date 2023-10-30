export type TAuthSlice = {
  authToken: string | null;
  refreshToken: string | null;
};

export const loginSuccess = (state: TAuthSlice, action: any) => {
  const data = action.payload.data;
  state.authToken = data.authToken;
  state.refreshToken = data.refreshToken;
};

export const registerSuccess = (state: TAuthSlice, action: any) => {
  const data = action.payload.data;
  state.authToken = data.authToken;
  state.refreshToken = data.refreshToken;
};

export const permissionsUpdate = (state: any, action: any) => {
  const data = action.payload.data.permissions;
  state.permissions = data.permissions;
};
