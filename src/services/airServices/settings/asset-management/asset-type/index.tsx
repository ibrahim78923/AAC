import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'ASSET_TYPE';
const { GET_ASSET_TYPE, POST_ASSET_TYPE, PATCH_ASSET_TYPE, EDIT_ASSET_TYPE } =
  END_POINTS;
export const assetTypeAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getAssetType: builder.query({
      query: (param) => ({
        url: `${GET_ASSET_TYPE}`,
        method: 'GET',
        params: param,
      }),
      providesTags: [TAG],
    }),
    postAssetType: builder.mutation({
      query: (body: any) => ({
        url: `${POST_ASSET_TYPE}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    patchAssetType: builder.mutation({
      query: (body: any) => ({
        url: `${PATCH_ASSET_TYPE}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    patchEditAssetType: builder.mutation({
      query: (body: any) => ({
        url: `${EDIT_ASSET_TYPE}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetAssetTypeQuery,
  usePostAssetTypeMutation,
  usePatchAssetTypeMutation,
  usePatchEditAssetTypeMutation,
} = assetTypeAPI;
