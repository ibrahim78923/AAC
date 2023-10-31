import { endpoints } from '@/routesConstants/endpoints';
import { TAGS, baseAPI } from '../base-api';
export const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: string) => ({
        url: endpoints.login,
        method: 'PUT',
        body: credentials,
      }),
    }),
    signUp: builder.mutation({
      query: (user: string) => ({
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
  }),
});

export const {
  useLoginMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useSignUpMutation,
  useLogoutMutation,
  useGetPermissionsQuery,
} = authAPI;
