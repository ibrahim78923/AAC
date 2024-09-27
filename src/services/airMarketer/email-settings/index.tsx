import { EMAILS_MARKETING_SETTINGS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = ['EMAIL_SETTINGS'];
export const emailTemplatesApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getEmailSettingsIdentities: builder.query({
      query: ({ params }: any) => ({
        url: `${EMAILS_MARKETING_SETTINGS?.EMAIL_SETTINGS}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    postEmailSettings: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${EMAILS_MARKETING_SETTINGS?.CREATE_EMAIL_SETTINGS}`,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),
    resendEmailOTP: builder.mutation({
      query: ({ email }: any) => {
        return {
          url: `${EMAILS_MARKETING_SETTINGS?.RESEND_EMAIL_OTP}?email=${email}`,
          method: 'POST',
        };
      },
      invalidatesTags: TAG,
    }),
    deleteEmailSettings: builder.mutation({
      query: ({ id }: any) => {
        return {
          url: `${EMAILS_MARKETING_SETTINGS?.DELETE_EMAIL_IDENTITIES}?ids=${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: TAG,
    }),
    emailSettingsVerifyOTP: builder.mutation({
      query: ({ code, email }: any) => {
        return {
          url: `${EMAILS_MARKETING_SETTINGS?.EMAIL_VERIFY_OTP_SETTINGS}?code=${code}&email=${email}`,
          method: 'POST',
        };
      },
      invalidatesTags: TAG,
    }),
    emailSettingsLatestIdentities: builder.mutation({
      query: () => {
        return {
          url: `${EMAILS_MARKETING_SETTINGS?.UPDATE_EMAIL_IDENTITIES}`,
          method: 'POST',
        };
      },
      invalidatesTags: TAG,
    }),
    getAllEmailsIdentitiesAsync: builder?.query({
      query: ({ params }: any) => ({
        url: `${EMAILS_MARKETING_SETTINGS?.EMAIL_SETTINGS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.emailIdentitiesSES;
      },
    }),
  }),
});

export const {
  useGetEmailSettingsIdentitiesQuery,
  usePostEmailSettingsMutation,
  useEmailSettingsVerifyOTPMutation,
  useEmailSettingsLatestIdentitiesMutation,
  useDeleteEmailSettingsMutation,
  useResendEmailOTPMutation,
  useLazyGetAllEmailsIdentitiesAsyncQuery,
} = emailTemplatesApi;
