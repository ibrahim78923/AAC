export type TAuthSlice = {
  accessToken: string | null;
  refreshToken: string | null;
};

export const loginSuccess = (state: TAuthSlice, action: any) => {
  const data = action?.payload?.data;
  state.accessToken = data?.accessToken;
  state.refreshToken = data?.refreshToken;
};

export const registerSuccess = (state: TAuthSlice, action: any) => {
  const data = action?.payload?.data;
  state.accessToken = data?.accessToken;
  state.refreshToken = data?.refreshToken;
};

//whenever permissions api will updated this will run and update the global permissions state

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const permissionsUpdate = (state: any, action: any) => {
  const data = action.payload.data?.account?.role?.permissions;
  state.permissions = data.permissions;
};
