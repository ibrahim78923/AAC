import { AIR_MARKETER } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const socialMarketerAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCampaignsView: builder.query({
      query: ({ ...params }) => ({
        url: `${AIR_MARKETER?.CAMPAIGNS_VIEW}`,
        method: 'GET',
        params,
      }),
      providesTags: ['CAMPAIGNS'],
    }),
  }),
});

export const { useGetCampaignsViewQuery } = socialMarketerAPI;
