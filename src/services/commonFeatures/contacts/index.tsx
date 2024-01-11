import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = ['CONTACTS'];
export const contactsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.CONTACTS,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),
    getContactById: builder.query({
      query: (id: any) => ({
        url: `${END_POINTS?.CONTACTS}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),
    postContacts: builder.mutation({
      query: ({ body }: any) => ({
        url: END_POINTS?.CONTACTS,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),
    updateContact: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.CONTACTS}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
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

    deleteContact: builder.mutation({
      query: ({ id }: any) => ({
        url: `${END_POINTS?.CONTACTS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
    }),

    getDeletedContacts: builder.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.CONTACT_RESTORE,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),
  }),
});

export const {
  useGetContactsStatusQuery,
  useGetContactsQuery,
  useGetContactByIdQuery,
  useGetLifeCycleQuery,
  usePostContactsMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
  useGetDeletedContactsQuery,
} = contactsAPI;
