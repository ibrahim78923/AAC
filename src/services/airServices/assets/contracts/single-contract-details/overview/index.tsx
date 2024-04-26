import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const { GET_CONTRACTS_OVERVIEW } = END_POINTS;
const TAGS = 'CONTRACTS_OVERVIEW';
export const contractsOverview = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getContractsOverview: builder.query({
      query: (id: any) => ({
        url: `${GET_CONTRACTS_OVERVIEW}/${id}`,
        method: 'GET',
      }),
      providesTags: [TAGS],
    }),
  }),
});

export const { useGetContractsOverviewQuery } = contractsOverview;
