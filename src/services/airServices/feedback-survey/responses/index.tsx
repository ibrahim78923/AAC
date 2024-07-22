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
    patchSingleSurveyQuestionsAnswerForResponse: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.PATCH_SINGLE_FEEDBACK_ANSWERS_FOR_RESPONSE}`,
        method: 'PATCH',
        body: apiDataParameter?.body,
        params: apiDataParameter?.queryParams,
      }),
    }),
    patchSingleSurveyDropoutAnswerForResponse: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.PATCH_SINGLE_FEEDBACK_DROPOUT_ANSWERS_FOR_RESPONSE}`,
        method: 'PATCH',
        body: apiDataParameter?.body,
        params: apiDataParameter?.queryParams,
      }),
    }),
    getSingleSurveyDetailsForAllResponse: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.GET_SINGLE_SURVEY_ALL_RESPONSES_DETAILS}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
  }),
});

export const {
  useLazyGetSingleSurveyForResponseQuery,
  useGetSingleSurveyForResponseQuery,
  usePatchSingleSurveyQuestionsAnswerForResponseMutation,
  usePatchSingleSurveyDropoutAnswerForResponseMutation,
  useGetSingleSurveyDetailsForAllResponseQuery,
} = feedbackSurveyResponseApi;
