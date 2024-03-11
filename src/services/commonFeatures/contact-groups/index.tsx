import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

const TAG = ['CONTACT_GROUPS'];
export const contactGroupsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: ({ params }) => ({
        url: END_POINTS?.CONTACT_GROUPS,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getGroupById: builder.query({
      query: (id: any) => ({
        url: `${END_POINTS?.CONTACT_GROUPS}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),

    postGroup: builder.mutation({
      query: ({ body }: any) => ({
        url: END_POINTS?.CONTACT_GROUPS,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    updateGroup: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.CONTACT_GROUPS}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    deleteGroup: builder.mutation({
      query: (id: any) => ({
        url: `${END_POINTS?.CONTACT_GROUPS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetGroupByIdQuery,
  usePostGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
} = contactGroupsAPI;
