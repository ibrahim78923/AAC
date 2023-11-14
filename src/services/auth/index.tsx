import { END_POINTS } from '@/routesConstants/endpoints';
import { TAGS, baseAPI } from '../base-api';
export const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    authLogin: builder.mutation({
      query: (credentials: string) => ({
        url: END_POINTS.login,
        method: 'POST',
        body: credentials,
      }),
    }),

    signUp: builder.mutation({
      query: ({ user }: any) => ({
        url: END_POINTS.signup,
        method: 'POST',
        body: user,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (user: string) => ({
        url: END_POINTS.forgot_password,
        method: 'POST',
        body: user,
      }),
    }),
    resetPassword: builder.mutation({
      query: (user: string) => ({
        url: END_POINTS.reset_password,
        method: 'POST',
        body: user,
      }),
    }),

    authCompanyVerification: builder.mutation({
      query: ({ email }: any) => ({
        url: END_POINTS.auth_IG_Verification,
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
        url: END_POINTS.get_permissions,
        method: 'GET',
      }),
      providesTags: ['permissions'],
    }),

    getAuthCompanies: builder.query({
      query: ({ q }) => ({
        url: `${END_POINTS.auth_search_company}?by=crn&q=${q}`,
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
  useAuthCompanyVerificationMutation,
} = authAPI;
