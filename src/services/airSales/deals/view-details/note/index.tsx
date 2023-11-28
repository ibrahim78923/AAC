import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const exampleExampleAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getDealNote: builder.query({
      query: () => ({
        url: `${END_POINTS?.VIEW_DEALS_NOTES}`,
        method: 'GET',
      }),
      providesTags: ['DEALS_NOTES'],
    }),
    postDealNote: builder.mutation({
      query: ({ body }: any) => ({
        url: END_POINTS?.VIEW_DEALS_NOTES,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['DEALS_NOTES'],
    }),
    updateDealNote: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.VIEW_DEALS_NOTES}/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['DEALS_NOTES'],
    }),
    deleteDealNote: builder.mutation({
      query: ({ id }: any) => ({
        url: `${END_POINTS?.VIEW_DEALS_NOTES}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['DEALS_NOTES'],
    }),
  }),
});

export const {
  useGetDealNoteQuery,
  usePostDealNoteMutation,
  useUpdateDealNoteMutation,
  useDeleteDealNoteMutation,
} = exampleExampleAPI;
