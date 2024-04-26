import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'LEADER_BOARD_AGENT_LEVELS';

export const leaderBoardAgentLevelsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    addAgentLevels: builder?.mutation({
      query: (body: any) => ({
        url: `${END_POINTS?.LEADER_BOARD_ADD_AGENT_LEVELS}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),

    getAgentLevels: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.LEADER_BOARD_GET_AGENT_LEVELS}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
  }),
});

export const { useAddAgentLevelsMutation, useGetAgentLevelsQuery } =
  leaderBoardAgentLevelsAPI;
