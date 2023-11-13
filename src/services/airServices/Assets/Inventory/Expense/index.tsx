import { baseAPI } from '@/services/base-api';
const TAG = 'Expense';
export const gpDetailsEXpenseInfoApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // getEXpenseDetailsListData: builder.query({
    //   query: (apiDataParameter: any) => ({
    //     url: 'foster-child/gp-info/all',
    //     method: 'GET',
    //     params: apiDataParameter.queryParams,
    //   }),
    //   providesTags: [TAG],
    // }),
    // getSingleGpDetailsInfoData: builder.query({
    //   query: (apiDataParameter: any) => ({
    //     url: `foster-child/gp-info/${apiDataParameter?.pathParams?.id}`,
    //     method: 'GET',
    //     params: apiDataParameter?.queryParams,
    //   }),
    // }),
    postExpenseInfoData: builder.mutation({
      query: (apiDataParameter: any) => ({
        url: 'expense/add-expense',
        method: 'POST',
        params: apiDataParameter.queryParams,
        body: apiDataParameter.body,
      }),
      invalidatesTags: [TAG],
    }),
    // patchGpDetailsInfoData: builder.mutation({
    //   query: (apiDataParameter: any) => ({
    //     url: `foster-child/gp-info/${apiDataParameter?.pathParams?.id}`,
    //     method: 'PATCH',
    //     params: apiDataParameter?.queryParams,
    //     body: apiDataParameter?.body,
    //   }),
    //   invalidatesTags: [TAG],
    // }),
    // deleteGpDetailsInfoData: builder.mutation({
    //   query: (apiDataParameter: any) => ({
    //     url: `foster-child/gp-info/${apiDataParameter?.pathParams?.id}`,
    //     method: 'DELETE',
    //     params: apiDataParameter?.queryParams,
    //   }),
    //   invalidatesTags: [TAG],
    // }),
  }),
});

export const {
  //   useGetAllGpDetailsListDataQuery,
  //   useLazyGetAllGpDetailsListDataQuery,
  //   useLazyGetSingleGpDetailsInfoDataQuery,
  //   useGetSingleGpDetailsInfoDataQuery,
  //   usePatchGpDetailsInfoDataMutation,
  usePostExpenseInfoDataMutation,
  //   useDeleteGpDetailsInfoDataMutation,
} = gpDetailsEXpenseInfoApi;
