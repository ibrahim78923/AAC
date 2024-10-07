import { END_POINTS } from '@/routesConstants/endpoints';
import { TAGS, baseAPI } from '../base-api';
export const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    authLogin: builder.mutation({
      query: (credentials: string) => ({
        url: END_POINTS.LOGIN,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['PERMISSIONS'],
    }),

    signUp: builder.mutation({
      query: ({ user }: any) => ({
        url: END_POINTS.SIGNUP,
        method: 'POST',
        body: user,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (payload) => ({
        url: END_POINTS.FORGOT_PASSWORD,
        method: 'POST',
        body: payload,
      }),
    }),
    resetPassword: builder.mutation({
      query: (user: string) => ({
        url: END_POINTS.RESET_PASSWORD,
        method: 'POST',
        body: user,
      }),
    }),
    changePassword: builder.mutation({
      query: (payload: any) => ({
        url: END_POINTS?.CHANGE_PASSWORD,
        method: 'POST',
        body: payload,
      }),
    }),

    authCompanyVerification: builder.mutation({
      query: ({ email }: any) => ({
        url: END_POINTS.AUTH_IG_VERIFICATION,
        method: 'POST',
        body: email,
      }),
    }),

    logout: builder.mutation<null, void>({
      queryFn: () => ({ data: null }),
      invalidatesTags: TAGS,
    }),
    getPermissions: builder.query({
      query: () => ({
        url: END_POINTS.GET_PERMISSIONS,
        method: 'GET',
      }),
      providesTags: ['permissions'],
    }),

    getAuthCompanies: builder.query({
      query: ({ q }) => ({
        url: `${END_POINTS.AUTH_SEARCH_COMPANY}?by=crn&q=${q}`,
        method: 'GET',
      }),
      providesTags: ['companies'],
    }),
    getAuthAccounts: builder.query({
      query: () => ({
        url: `${END_POINTS?.AUTH_ACCOUNTS}`,
        method: 'GET',
      }),
      providesTags: ['companies'],
    }),

    postAuthAccountSelect: builder.mutation({
      query: (payload: any) => ({
        url: END_POINTS?.AUTH_ACCOUNTS_SELECT,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['ACCOUNTS'],
    }),

    getAuthMyAccount: builder.query({
      query: () => ({
        url: `${END_POINTS?.AUTH_MY_ACCOUNT}`,
        method: 'GET',
      }),
      providesTags: ['companies', 'ACCOUNTS', 'PERMISSIONS'],
    }),

    getEmailCheck: builder.query({
      query: ({ email }) => ({
        url: `${END_POINTS?.EMAIL_EXIST}?email=${email}`,
        method: 'GET',
      }),
      providesTags: ['auth'],
    }),
    setPassword: builder.mutation({
      query: (payload: any) => ({
        url: END_POINTS?.SET_PASSWORD,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {
  useAuthLoginMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useSignUpMutation,
  useLogoutMutation,
  useGetPermissionsQuery,
  useGetAuthCompaniesQuery,
  useGetAuthAccountsQuery,
  usePostAuthAccountSelectMutation,
  useGetAuthMyAccountQuery,
  useAuthCompanyVerificationMutation,
  useChangePasswordMutation,
  useGetEmailCheckQuery,
  useSetPasswordMutation,
} = authAPI;
