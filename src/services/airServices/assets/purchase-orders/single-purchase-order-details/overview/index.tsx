import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'PURCHASE_ORDER_OVERVIEW';

export const purchaseOrderOverview = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAirServicesPurchaseOrderOverview: builder.query({
      query: (id: any) => ({
        url: `${END_POINTS?.GET_PURCHASE_ORDER_OVERVIEW}/${id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
  }),
});

export const { useGetAirServicesPurchaseOrderOverviewQuery } =
  purchaseOrderOverview;
