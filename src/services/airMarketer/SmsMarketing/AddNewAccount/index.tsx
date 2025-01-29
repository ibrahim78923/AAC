import { AIR_MARKETER_SMS_MARKETING } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAGS = ['TWILIO_CONFIGURATION'];

export const AddNewAccount = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    addTwilioConfiguration: builder.mutation({
      query: ({ body }: any) => ({
        url: `${AIR_MARKETER_SMS_MARKETING?.TWILIO_CONFIGURATION}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAGS,
    }),

    getTwilioConfigurations: builder.query({
      query: ({ params }: any) => ({
        url: AIR_MARKETER_SMS_MARKETING?.GET_TWILIO_CONFIGURATION,
        method: 'GET',
        params: params,
      }),
      providesTags: TAGS,
    }),
    getTwilioNumbersConfigurations: builder.query({
      query: ({ params }: any) => ({
        url: AIR_MARKETER_SMS_MARKETING?.GET_NUMBERS_TWILIO_CONFIGURATION,
        method: 'GET',
        params: params,
      }),
      providesTags: TAGS,
    }),

    deleteTwilioConfigurationPhoneNumber: builder.mutation({
      query: (body) => ({
        url: `${AIR_MARKETER_SMS_MARKETING?.DELETE_WHSTSAPP_TWILIO_CONFIGURATION_NUMBER}`,
        method: 'DELETE',
        body: body,
      }),
      invalidatesTags: TAGS,
    }),

    updateAccountConfig: builder.mutation({
      query: ({ body, id }: any) => ({
        url: `${AIR_MARKETER_SMS_MARKETING?.UPDATE_ACCOUNT}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAGS,
    }),
    updateSMSAccountConfig: builder.mutation({
      query: ({ body, id }: any) => ({
        url: `${AIR_MARKETER_SMS_MARKETING?.UPDATE_ACCOUNT}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAGS,
    }),
  }),
});

export const {
  useAddTwilioConfigurationMutation,
  useGetTwilioConfigurationsQuery,
  useGetTwilioNumbersConfigurationsQuery,
  useDeleteTwilioConfigurationPhoneNumberMutation,
  useUpdateAccountConfigMutation,
  useUpdateSMSAccountConfigMutation,
} = AddNewAccount;
