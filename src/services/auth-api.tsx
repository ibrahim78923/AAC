import { TAGS, baseAPI } from './base-api';

export const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation<null, void>({
      queryFn: () => ({ data: null }),
      invalidatesTags: TAGS,
    }),
    login: builder.mutation({
      query: (credentials: string) => ({
        url: 'auth/signin',
        method: 'PUT',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (user: string) => ({
        url: 'register',
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
    passCode: builder.mutation({
      query: (user: string) => ({
        url: 'register',
        method: 'POST',
        body: user,
      }),
    }),
    resendCode: builder.mutation({
      query: (user: string) => ({
        url: 'register',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  usePassCodeMutation,
  useResendCodeMutation,
  useForgotPasswordMutation,
  useLogoutMutation,
} = authAPI;
