import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const loyaltyProgramSettingsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getLoyaltyProgramSettingsGeneralSettings: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_LOYALTY_GENERAL_SETTINGS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    addLoyaltyProgramSettingsGeneralSettings: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.CREATE_LOYALTY_GENERAL_SETTINGS,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
    }),
    updateLoyaltyProgramSettingsGeneralSettings: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.UPDATE_LOYALTY_GENERAL_SETTINGS}`,
        method: 'PATCH',
        params: apiDataParameter?.queryParams,
      }),
    }),
  }),
});

export const {
  useLazyGetLoyaltyProgramSettingsGeneralSettingsQuery,
  useGetLoyaltyProgramSettingsGeneralSettingsQuery,
  useAddLoyaltyProgramSettingsGeneralSettingsMutation,
  useUpdateLoyaltyProgramSettingsGeneralSettingsMutation,
} = loyaltyProgramSettingsAPI;
