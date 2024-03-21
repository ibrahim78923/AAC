import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const newEmailAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    postNewEmail: builder?.mutation({
      query: (body: any) => ({
        url: `${END_POINTS?.TICKET_NEW_EMAIL}`,
        method: 'POST',
        body,
      }),
    }),
  }),
});
export const { usePostNewEmailMutation } = newEmailAPI;
