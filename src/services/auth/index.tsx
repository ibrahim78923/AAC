import { endpoints } from '@/routesConstants/endpoints';
import { TAGS, baseAPI } from '../base-api';
export const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    authLogin: builder.mutation({
      query: (credentials: string) => ({
        url: endpoints.login,
        method: 'POST',
        body: credentials,
      }),
    }),

    signUp: builder.mutation({
      query: ({ user }: any) => ({
        url: endpoints.signup,
        method: 'POST',
        body: user,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (user: string) => ({
        url: endpoints.forgot_password,
        method: 'POST',
        body: user,
      }),
    }),
    resetPassword: builder.mutation({
      query: (user: string) => ({
        url: endpoints.reset_password,
        method: 'POST',
        body: user,
      }),
    }),

    authCompanyVerification: builder.mutation({
      query: ({ email }: any) => ({
        url: endpoints.auth_IG_Verification,
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
        url: endpoints.get_permissions,
        method: 'GET',
      }),
      providesTags: ['permissions'],
    }),

    getAuthCompanies: builder.query({
      query: ({ q }) => ({
        url: `${endpoints.auth_search_company}?by=crn&q=${q}`,
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
