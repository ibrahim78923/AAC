import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const exampleExampleAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ({
        url: END_POINTS.CONTACTS,
        method: 'GET',
      }),
      providesTags: ['CONTACTS'],
    }),
    postContacts: builder.mutation({
      query: ({ body }: any) => ({
        url: END_POINTS?.CONTACTS,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['CONTACTS'],
    }),
    updateContacts: builder.mutation({
      query: ({ body, contactId }: any) => ({
        url: `${END_POINTS?.CONTACTS}/${contactId}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['CONTACTS'],
    }),

    getLifeCycle: builder.query({
      query: () => ({
        url: `${END_POINTS?.LIFECYCLE_STAGES}?page=1&limit=10`,
        method: 'GET',
      }),
      providesTags: ['lifeCycle'],
    }),

    getContactsStatus: builder.query({
      query: () => ({
        url: `${END_POINTS?.CONTACT_STATUS}?page=1&limit=10&status=inactive`,
        method: 'GET',
      }),
      providesTags: ['ContactsStatus'],
    }),
  }),
});

export const {
  useGetContactsStatusQuery,
  useGetContactsQuery,
  useGetLifeCycleQuery,
  usePostContactsMutation,
  useUpdateContactsMutation,
} = exampleExampleAPI;
