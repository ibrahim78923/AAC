import { setAuthTokens } from '@/redux/slices/auth/slice';
import { useAppDispatch } from '@/redux/store';
import { useGetAuthMyAccountQuery } from '@/services/auth';

import {
  getActiveProductSession,
  getSession,
  isTokenValidationCheck,
  setActivePermissionsSession,
  setActiveProductSession,
  setSession,
} from '@/utils';

import { createContext, useEffect, useReducer, ReactNode } from 'react';

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  isPermissions: false,
  user: null,
  product: {},
};

//TODO:first step context Creation
const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (res: any) => Promise.resolve(),
  logout: () => Promise.resolve(),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setActiveProduct: (res: any) => Promise.resolve(),
  setPermissions: () => Promise.resolve(),
});

//TODO:second step make methods for reducers this will be used globally
const handlers = {
  INITIALIZE: (state: any, action: any) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state: any, action: any) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state: any) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    product: null,
    isPermissions: false,
  }),
  REGISTER: (state: any, action: any) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },

  ACTIVE_PRODUCT: (state: any, action: any) => {
    const { product } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      product,
    };
  },

  INITIALIZEPERMISSIONS: (state: any, action: any) => {
    const { isPermissions, isAuthenticated } = action.payload;
    return {
      ...state,
      isAuthenticated: isAuthenticated,
      isPermissions: isPermissions,
    };
  },
};

//TODO:reducers check our handler type and call method according to that for global state recognitions
const reducer = (state: any, action: any) =>
  handlers[action?.type as keyof typeof handlers]
    ? handlers[action?.type as keyof typeof handlers](state, action)
    : state;

function AuthProvider({ children }: { children: ReactNode }) {
  //TODO:reducer to keep an eye on specific called reducer function which method from handler called
  const [state, dispatch] = useReducer(reducer, initialState);

  const { data: permissionsData, refetch } = useGetAuthMyAccountQuery(
    {},
    { skip: !state?.isPermissions },
  );

  if (state?.isPermissions) {
    setActivePermissionsSession(
      permissionsData?.data?.account?.role?.permissions,
    );
  }
  // const [logoutTrigger] = useLogoutMutation();

  const appDispatch = useAppDispatch();

  useEffect(() => {
    const initialize = () => {
      try {
        const {
          accessToken,
          refreshToken,
          user,
        }: { accessToken: string; refreshToken: string; user: any } =
          getSession();
        const product = getActiveProductSession();

        if (accessToken && isTokenValidationCheck(accessToken)) {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });

          dispatch({
            type: 'ACTIVE_PRODUCT',
            payload: {
              product,
            },
          });

          //TODO: Set auth tokens is redux for api headers
          const authData: any = { accessToken, refreshToken };

          appDispatch(setAuthTokens(authData));
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, [appDispatch]);

  //TODO:called at the time of  user login
  const login = (response: any) => {
    const {
      accessToken,
      user,
      refreshToken,
    }: { accessToken: string; refreshToken: string; user: any } =
      response?.data;

    setSession({ accessToken, user, refreshToken });
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });
  };

  const setActiveProduct = (product: any) => {
    setActiveProductSession(product);

    dispatch({
      type: 'ACTIVE_PRODUCT',
      payload: {
        product,
      },
    });
  };

  const setPermissions = () => {
    dispatch({
      type: 'INITIALIZEPERMISSIONS',
      payload: {
        isAuthenticated: true,
        isPermissions: true,
      },
    });
    state?.isPermissions && refetch();
  };

  //TODO:called at the time of  user logout
  const logout = async () => {
    setActiveProductSession(null);
    setSession(null);
    setActivePermissionsSession(null);
    dispatch({ type: 'LOGOUT' });
    appDispatch({ type: 'auth/logout' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        setActiveProduct,
        setPermissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
