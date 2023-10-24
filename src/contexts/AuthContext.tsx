// import { useAppDispatch } from "@/redux/store";
// import { getDecryptedObject } from "@/utils";
// import jwtDecode from "jwt-decode";
// import { createContext, useEffect, useReducer, ReactNode } from "react";

// const initialState = {
//     isAuthenticated: false,
//     isInitialized: false,
//     user: null,
// };

// const AuthContext = createContext({
//     ...initialState,
//     method: "jwt",
//     login: (res: any) => Promise.resolve(),
//     logout: () => Promise.resolve(),
// });

// const handlers = {
//     INITIALIZE: (state: any, action: any) => {
//         const { isAuthenticated, user } = action.payload;
//         return {
//             ...state,
//             isAuthenticated,
//             isInitialized: true,
//             user,
//         };
//     },
//     LOGIN: (state: any, action: any) => {
//         const { user } = action.payload;

//         return {
//             ...state,
//             isAuthenticated: true,
//             user,
//         };
//     },
//     LOGOUT: (state: any) => ({
//         ...state,
//         isAuthenticated: false,
//         user: null,
//     }),
//     REGISTER: (state: any, action: any) => {
//         const { user } = action.payload;

//         return {
//             ...state,
//             isAuthenticated: true,
//             user,
//         };
//     },
// };

// const isValidToken = (accessToken: string) => {
//     if (!accessToken) {
//         return false;
//     }
//     const decoded: any = jwtDecode(accessToken);
//     const currentTime = Date.now() / 1000;

//     return decoded.exp > currentTime;
// };

// const reducer = (state: any, action: any) =>
//     handlers[action.type as keyof typeof handlers]
//         ? handlers[action.type as keyof typeof handlers](state, action)
//         : state;

// function AuthProvider({ children }: { children: ReactNode }) {
//     const [state, dispatch] = useReducer(reducer, initialState);
//     // const [logoutTrigger] = useLogoutMutation();
//     const appDispatch = useAppDispatch();

//     useEffect(() => {
//         const initialize = () => {
//             try {
//                 const {
//                     authToken,
//                     refreshToken,
//                     user,
//                 }: { authToken: string; refreshToken: string; user: any } = getSession();
//                 const { } = getDecryptedObject('SessionData', 'UserSession')

//                 if (authToken && isValidToken(authToken)) {
//                     dispatch({
//                         type: "INITIALIZE",
//                         payload: {
//                             isAuthenticated: true,
//                             user,
//                         },
//                     });
//                     // Set auth tokens is redux for api headers
//                     const authData: any = { authToken, refreshToken };
//                     appDispatch(setAuthTokens(authData));
//                 } else {
//                     dispatch({
//                         type: "INITIALIZE",
//                         payload: {
//                             isAuthenticated: false,
//                             user: null,
//                         },
//                     });
//                 }
//             } catch (err) {
//                 console.error(err);
//                 dispatch({
//                     type: "INITIALIZE",
//                     payload: {
//                         isAuthenticated: false,
//                         user: null,
//                     },
//                 });
//             }
//         };

//         initialize();
//     }, [appDispatch]);

//     const login = (response: any) => {

//         const { authToken, refreshToken, user } = response;

//         console.log('user===', response);

//         //   setSession({
//         //     // authToken,
//         //     // refreshToken,
//         //     user
//         //   });

//         dispatch({
//             type: "LOGIN",
//             payload: {
//                 user,
//             },
//         });

//     };

//     const logout = async () => {
//         //   setSession(null);
//         dispatch({ type: "LOGOUT" });
//         appDispatch({ type: "auth/logout" });
//         logoutTrigger();
//     };

//     return (
//         <AuthContext.Provider
//             value={{
//                 ...state,
//                 method: "jwt",
//                 login,
//                 logout,
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// }

export {};
