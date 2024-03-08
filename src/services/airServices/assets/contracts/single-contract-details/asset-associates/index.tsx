import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'ASSET_ASSOCIATE';

export const assetAssociateApi = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    putAssetAssociate: builder?.mutation({
      query: ({ contractId, body }: any) => ({
        url: `${END_POINTS?.EDIT_CONTRACT}/${contractId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    getInventoryList: builder?.query({
      query: (params: any) => ({
        url: `${END_POINTS?.ASSETS_INVENTORY}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
    getSingleContractList: builder?.query({
      query: (contractId: any) => ({
        url: `${END_POINTS?.GET_SINGLE_ASSETS_CONTRACT}/${contractId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
  }),
});

export const {
  useLazyGetInventoryListQuery,
  usePutAssetAssociateMutation,
  useLazyGetSingleContractListQuery,
} = assetAssociateApi;
