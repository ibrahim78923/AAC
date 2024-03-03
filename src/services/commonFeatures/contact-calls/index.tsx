import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

const TAG = ['CONTACT_CALL'];
export const contactCallAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCalls: builder.query({
      query: ({ params }) => ({
        url: END_POINTS?.CONTACT_CALL,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getCallById: builder.query({
      query: (id: any) => ({
        url: `${END_POINTS?.CONTACT_CALL}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),

    postCall: builder.mutation({
      query: ({ body }: any) => ({
        url: END_POINTS?.CONTACT_CALL,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    updateCall: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.CONTACT_CALL}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    deleteCall: builder.mutation({
      query: (id: any) => ({
        url: `${END_POINTS?.CONTACT_CALL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
    }),
  }),
});

export const {
  useGetCallsQuery,
  useGetCallByIdQuery,
  usePostCallMutation,
  useUpdateCallMutation,
  useDeleteCallMutation,
} = contactCallAPI;
