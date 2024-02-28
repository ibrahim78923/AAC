import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TICKETS';
export const reportAnIssue = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    postReportAnIssue: builder?.mutation({
      query: (postReportAnIssueParameter: any) => ({
        url: `${END_POINTS?.TICKET}`,
        method: 'POST',
        body: postReportAnIssueParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const { usePostReportAnIssueMutation } = reportAnIssue;
