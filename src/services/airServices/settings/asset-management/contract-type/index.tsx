import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'CONTRACT_TYPE';

export const contractTypeAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getSettingsContractTypeList: builder.query({
      query: (params) => ({
        url: END_POINTS?.CONTRACT_TYPE_SERVICES_SETTINGS,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
    postContractType: builder.mutation({
      query: (body: any) => ({
        url: END_POINTS?.CONTRACT_TYPE_SERVICES_SETTINGS,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    patchContractType: builder.mutation({
      query: (body: any) => ({
        url: END_POINTS?.CONTRACT_TYPE_SERVICES_SETTINGS,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteContractType: builder.mutation({
      query: (params: any) => ({
        url: END_POINTS?.CONTRACT_TYPE_SERVICES_SETTINGS,
        method: 'DELETE',
        params,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetSettingsContractTypeListQuery,
  usePostContractTypeMutation,
  usePatchContractTypeMutation,
  useDeleteContractTypeMutation,
} = contractTypeAPI;
