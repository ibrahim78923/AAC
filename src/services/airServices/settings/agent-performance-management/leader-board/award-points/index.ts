import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'LEADER_BOARD_AWARD_POINTS';

export const leaderBoardAwardPointsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    addAirServicesSettingsLeaderBoardAwardPoints: builder?.mutation({
      query: (body: any) => ({
        url: `${END_POINTS?.LEADER_BOARD_ADD_AWARD_POINTS}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    getAirServicesSettingsLeaderBoardAwardPoints: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.LEADER_BOARD_GET_AWARD_POINTS}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
  }),
});

export const {
  useAddAirServicesSettingsLeaderBoardAwardPointsMutation,
  useGetAirServicesSettingsLeaderBoardAwardPointsQuery,
} = leaderBoardAwardPointsAPI;
