import { setAuthTokens } from '@/redux/slices/auth/slice';
import { useAppDispatch } from '@/redux/store';
import { getSession, setSession } from '@/utils';

import { createContext, useEffect, useReducer, ReactNode } from 'react';

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  permissions: [],
};

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (res: any) => Promise.resolve(),
  logout: () => Promise.resolve(),
});

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
  }),
  REGISTER: (state: any, action: any) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  SET_PERMISSIONS: (state: any, action: any) => {
    const { permissions } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      permissions,
    };
  },
};

const reducer = (state: any, action: any) =>
  handlers[action.type as keyof typeof handlers]
    ? handlers[action.type as keyof typeof handlers](state, action)
    : state;

function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [logoutTrigger] = useLogoutMutation();
  const appDispatch = useAppDispatch();

  useEffect(() => {
    const initialize = () => {
      try {
        const {
          authToken,
          refreshToken,
          user,
        }: { authToken: string; refreshToken: string; user: any } =
          getSession();

        // if (authToken && isValidToken(authToken)) {
        if (authToken) {
          permissions();

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
          // Set auth tokens is redux for api headers
          const authData: any = { authToken, refreshToken };

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

  const login = (response: any) => {
    const { authToken, user } = response;

    setSession({ authToken, user });
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });
  };

  const permissions = () => {
    // const { data:permissions } = useGetPermissionsQuery({})

    const permissions = [
      'add-user',
      'user-search-and-filter',
      'plan_management',
      'add',
      'user',
      'user_box',
      'view-dashboard',
    ];

    dispatch({
      type: 'SET_PERMISSIONS',
      payload: {
        isAuthenticated: true,
        permissions,
      },
    });
  };

  const logout = async () => {
    setSession(null);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
