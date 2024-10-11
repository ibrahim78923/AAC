import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const authAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    authCustomerSignUp: builder?.mutation({
      query: (body: any) => ({
        url: END_POINTS?.SIGNUP,
        method: 'POST',
        body,
      }),
    }),

    authCustomerIgVerification: builder.mutation({
      query: (body: any) => ({
        url: END_POINTS.AUTH_IG_VERIFICATION,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useAuthCustomerSignUpMutation,
  useAuthCustomerIgVerificationMutation,
} = authAPI;
