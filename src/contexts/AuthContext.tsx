import {
  SUPER_ADMIN_DASHBOARD_PERMISSIONS,
  SUPER_ADMIN_PLAN_MANAGEMENT_PERMISSIONS,
  SUPER_ADMIN_USER_MANAGEMENT_PERMISSIONS,
} from '@/constants/permission-keys';
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
//TODO:first step context Creation
const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (res: any) => Promise.resolve(),
  logout: () => Promise.resolve(),
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

//TODO:reducers check our handler type and call method according to that for global state recognitions
const reducer = (state: any, action: any) =>
  handlers[action?.type as keyof typeof handlers]
    ? handlers[action?.type as keyof typeof handlers](state, action)
    : state;

function AuthProvider({ children }: { children: ReactNode }) {
  //TODO:reducer to keep an eye on specific called reducer function which method from handler called
  const [state, dispatch] = useReducer(reducer, initialState);

  //TODO:permisions api will be called after 40 sec if user is authenticated
  // useGetPermissionsQuery({}, {
  //   pollingInterval: 40000, skip: !state.isAuthenticated
  // })
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

        //TODO: if (authToken && isValidToken(authToken)) {
        if (accessToken) {
          //TODO: removed line after permissons api
          permissions();

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
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
    const { accessToken, user, refreshToken } = response?.data;

    //temporary call
    permissions();
    setSession({ accessToken, user, refreshToken });
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });
  };

  //TODO: temporary functions will be removed after permissions apis working
  const permissions = () => {
    const permissions = [
      SUPER_ADMIN_USER_MANAGEMENT_PERMISSIONS?.USER_LIST,
      SUPER_ADMIN_USER_MANAGEMENT_PERMISSIONS?.ADD_USER,
      SUPER_ADMIN_USER_MANAGEMENT_PERMISSIONS?.USER_SEARCH_AND_FILTER,
      SUPER_ADMIN_USER_MANAGEMENT_PERMISSIONS?.PLAN_MANAGEMENT,
      SUPER_ADMIN_PLAN_MANAGEMENT_PERMISSIONS?.PLAN_LIST,
      SUPER_ADMIN_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD,
    ];

    dispatch({
      type: 'SET_PERMISSIONS',
      payload: {
        isAuthenticated: true,
        permissions,
      },
    });
  };

  //TODO:called at the time of  user logout

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
