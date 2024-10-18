import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const loyaltyProgramLoyaltyTiersAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getLoyaltyProgramLoyaltyTiersList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_TIERS_LIST,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    getLoyaltyProgramLoyaltySingleTierDetails: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.GET_TIERS_BY_ID}/${apiDataParameter?.pathParams?.id}`,
        method: 'GET',
      }),
    }),
    addLoyaltyProgramLoyaltySingleTier: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.ADD_TIERS,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
    }),
    updateLoyaltyProgramLoyaltySingleTier: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.UPDATE_TIERS}/${apiDataParameter?.pathParams?.id}`,
        method: 'PUT',
        body: apiDataParameter?.body,
      }),
    }),
    deleteLoyaltyProgramLoyaltySingleTier: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: ``,
        method: 'DELETE',
        params: apiDataParameter?.queryParams,
      }),
    }),
    getLoyaltyProgramLoyaltyContactListDropdownForTier: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.CONTACTS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.contacts;
      },
    }),
  }),
});

export const {
  useLazyGetLoyaltyProgramLoyaltyTiersListQuery,
  useGetLoyaltyProgramLoyaltySingleTierDetailsQuery,
  useLazyGetLoyaltyProgramLoyaltySingleTierDetailsQuery,
  useAddLoyaltyProgramLoyaltySingleTierMutation,
  useUpdateLoyaltyProgramLoyaltySingleTierMutation,
  useDeleteLoyaltyProgramLoyaltySingleTierMutation,
  useLazyGetLoyaltyProgramLoyaltyContactListDropdownForTierQuery,
} = loyaltyProgramLoyaltyTiersAPI;
