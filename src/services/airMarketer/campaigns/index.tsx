import { AIR_MARKETER } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const socialMarketerAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCampaigns: builder.query({
      query: ({ ...params }) => ({
        url: `${AIR_MARKETER?.CAMPAIGNS}`,
        method: 'GET',
        params,
      }),
      providesTags: ['CAMPAIGNS'],
    }),
    getCampaignsTasks: builder.query({
      query: ({ ...params }) => ({
        url: `${AIR_MARKETER?.CAMPAIGNS}`,
        method: 'GET',
        params,
      }),
      providesTags: ['CAMPAIGNS'],
    }),
  }),
});

export const { useGetCampaignsQuery, useGetCampaignsTasksQuery } =
  socialMarketerAPI;
