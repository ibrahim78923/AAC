import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const feedbackSurveyResponseApi = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getSingleSurveyForResponse: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.GET_SINGLE_FEEDBACK_FOR_RESPONSE}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
  }),
});

export const {
  useLazyGetSingleSurveyForResponseQuery,
  useGetSingleSurveyForResponseQuery,
} = feedbackSurveyResponseApi;
