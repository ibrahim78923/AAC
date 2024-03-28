import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const authAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    authCustomerLogin: builder?.mutation({
      query: (body: any) => ({
        url: END_POINTS?.LOGIN,
        method: 'POST',
        body,
      }),
    }),

    authCustomerSignUp: builder?.mutation({
      query: (body: any) => ({
        url: END_POINTS?.SIGNUP,
        method: 'POST',
        body,
      }),
    }),

    getAuthMe: builder?.query({
      query: () => ({
        url: `${END_POINTS?.AUTH_MY_ACCOUNT}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useAuthCustomerLoginMutation,
  useAuthCustomerSignUpMutation,
  useGetAuthMeQuery,
} = authAPI;
