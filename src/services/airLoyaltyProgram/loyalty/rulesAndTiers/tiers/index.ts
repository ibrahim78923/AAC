import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const tiersAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getTiersList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_RULES_AND_TIERS_LIST,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    addTiers: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.ADD_TIERS,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
    }),
    editSingleTiers: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'PATCH',
        body: apiDataParameter?.body,
      }),
    }),
    deleteTiers: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: ``,
        method: 'DELETE',
        params: apiDataParameter?.queryParams,
      }),
    }),
    getSingleTiersDetails: builder?.query({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    getContactsDropdownForTiers: builder?.query({
      query: ({ params }: any) => ({
        url: ``,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.contacts ?? [];
      },
    }),
  }),
});

export const {
  useAddTiersMutation,
  useGetTiersListQuery,
  useLazyGetTiersListQuery,
  useDeleteTiersMutation,
  useEditSingleTiersMutation,
  useGetSingleTiersDetailsQuery,
  useGetContactsDropdownForTiersMutation,
} = tiersAPI;
