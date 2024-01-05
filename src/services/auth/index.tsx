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
    }),

    signUp: builder.mutation({
      query: ({ user }: any) => ({
        url: END_POINTS.SIGNUP,
        method: 'POST',
        body: user,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (user: string) => ({
        url: END_POINTS.FORGOT_PASSWORD,
        method: 'POST',
        body: user,
      }),
    }),
    resetPassword: builder.mutation({
      query: (user: string) => ({
        url: END_POINTS.RESET_PASSWORD,
        method: 'POST',
        body: user,
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
    }),

    getAuthMyAccount: builder.query({
      query: () => ({
        url: `${END_POINTS?.AUTH_MY_ACCOUNT}`,
        method: 'GET',
      }),
      providesTags: ['companies'],
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
} = authAPI;
