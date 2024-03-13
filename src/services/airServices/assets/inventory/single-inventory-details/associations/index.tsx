import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TICKETS';

export const associationsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getAssociationsTickets: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.TICKET}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
  }),
});

export const {
  useGetAssociationsTicketsQuery,
  useLazyGetAssociationsTicketsQuery,
} = associationsAPI;
