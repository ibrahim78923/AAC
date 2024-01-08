import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

const TAG = ['CONTACT_NOTE'];
export const settingsFaqsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: ({ params }) => ({
        url: END_POINTS?.CONTACT_NOTE,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getNoteById: builder.query({
      query: (id: any) => ({
        url: `${END_POINTS?.CONTACT_NOTE}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),

    postNote: builder.mutation({
      query: ({ body }: any) => ({
        url: END_POINTS?.CONTACT_NOTE,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    updateNote: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.CONTACT_NOTE}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    deleteNote: builder.mutation({
      query: (id: any) => ({
        url: `${END_POINTS?.CONTACT_NOTE}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
    }),
  }),
});

export const {
  useGetNotesQuery,
  useGetNoteByIdQuery,
  useUpdateNoteMutation,
  usePostNoteMutation,
  useDeleteNoteMutation,
} = settingsFaqsAPI;
