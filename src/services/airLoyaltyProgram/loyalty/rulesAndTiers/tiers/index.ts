import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const tiersAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getTiersList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_TIERS_LIST,
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
      query: (id: any) => ({
        url: `${END_POINTS?.GET_TIERS_BY_ID}/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useAddTiersMutation,
  useGetTiersListQuery,
  useLazyGetTiersListQuery,
  useDeleteTiersMutation,
  useEditSingleTiersMutation,
  useLazyGetSingleTiersDetailsQuery,
} = tiersAPI;
