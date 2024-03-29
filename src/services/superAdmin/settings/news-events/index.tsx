import { baseAPI } from '@/services/base-api';
import { SUPER_ADMIN_SETTINGS } from '@/routesConstants/paths';

const TAG = ['SETTINGS_NEWS_EVENTS'];
export const settingsNewsEventsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getNewsEvents: builder.query({
      query: ({ params }) => ({
        url: SUPER_ADMIN_SETTINGS.NEWS_EVENTS,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    postNewsEvents: builder.mutation({
      query: ({ body }: any) => ({
        url: SUPER_ADMIN_SETTINGS.NEWS_EVENTS,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    updateNewsEvents: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${SUPER_ADMIN_SETTINGS.NEWS_EVENTS}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    deleteNewsEvents: builder.mutation({
      query: (id: any) => ({
        url: `${SUPER_ADMIN_SETTINGS.NEWS_EVENTS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
    }),
  }),
});

export const {
  useGetNewsEventsQuery,
  useUpdateNewsEventsMutation,
  usePostNewsEventsMutation,
  useDeleteNewsEventsMutation,
} = settingsNewsEventsAPI;
