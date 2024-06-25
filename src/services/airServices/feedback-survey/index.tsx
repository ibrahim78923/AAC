import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'FEEDBACK_SURVEY';
export const feedbackSurvey = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    postFeedbackSurvey: builder?.mutation({
      query: (body: any) => ({
        url: `${END_POINTS?.CREATE_FEEDBACK_SURVEY}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    patchFeedbackSurvey: builder?.mutation({
      query: ({ body, params }: any) => ({
        url: `${END_POINTS?.UPDATE_FEEDBACK_SURVEY}`,
        method: 'PATCH',
        body,
        params,
      }),
      invalidatesTags: [TAG],
    }),
    getFeedbackList: builder?.query({
      query: (params: any) => ({
        url: `${END_POINTS?.GET_FEEDBACK_LIST}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
    deleteFeedbackSurvey: builder?.mutation({
      query: (params: any) => ({
        url: `${END_POINTS?.DELETE_FEEDBACK_SURVEY}`,
        method: 'DELETE',
        params,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  usePostFeedbackSurveyMutation,
  usePatchFeedbackSurveyMutation,
  useLazyGetFeedbackListQuery,
  useDeleteFeedbackSurveyMutation,
} = feedbackSurvey;
