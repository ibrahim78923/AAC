import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    authCustomerLogin: builder.mutation({
      query: (body: any) => ({
        url: END_POINTS.LOGIN,
        method: 'POST',
        body,
      }),
    }),

    authCustomerSignUp: builder.mutation({
      query: (body: any) => ({
        url: END_POINTS.SIGNUP,
        method: 'POST',
        body,
      }),
    }),

    getComapnyDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.GET_DROPDOWN_COMPANY}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.data;
      },
    }),

    authIgVerification: builder.mutation({
      query: ({ email }: any) => ({
        url: END_POINTS.AUTH_IG_VERIFICATION,
        method: 'POST',
        body: email,
      }),
    }),
  }),
});

export const {
  useAuthCustomerLoginMutation,
  useAuthCustomerSignUpMutation,
  useLazyGetComapnyDropdownQuery,
  useAuthIgVerificationMutation,
} = authAPI;
