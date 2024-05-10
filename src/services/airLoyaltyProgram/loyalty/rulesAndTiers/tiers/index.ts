import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAGS = 'TIERS';
const TAG_ONE = 'CONTACTS';

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
      query: (postApiDataParameter: any) => ({
        url: END_POINTS?.ADD_TIERS,
        method: 'POST',
        body: postApiDataParameter?.body,
      }),
      invalidatesTags: [TAGS],
    }),
    editSingleTiers: builder?.mutation({
      query: (putApiDataParameter: any) => ({
        url: `${END_POINTS?.UPDATE_TIERS}/${putApiDataParameter?.id}`,
        method: 'PUT',
        body: putApiDataParameter?.body,
      }),
      invalidatesTags: [TAGS],
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
    getContactListForTier: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.CONTACTS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.contacts;
      },
      providesTags: [TAG_ONE],
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
  useLazyGetContactListForTierQuery,
  useLazyGetSingleTiersDetailsQuery,
} = tiersAPI;
