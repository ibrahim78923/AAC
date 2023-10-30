import { TAGS, baseAPI } from '../base-api';
export const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: string) => ({
        url: 'auth/signin',
        method: 'PUT',
        body: credentials,
      }),
    }),
    signUp: builder.mutation({
      query: (user: string) => ({
        url: 'auth/sign-up',
        method: 'POST',
        body: user,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (user: string) => ({
        url: 'auth/forgot-password',
        method: 'POST',
        body: user,
      }),
    }),
    resetPassword: builder.mutation({
      query: (user: string) => ({
        url: 'auth/confirm-forgot-password',
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
        url: `/user_permissions`,
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
