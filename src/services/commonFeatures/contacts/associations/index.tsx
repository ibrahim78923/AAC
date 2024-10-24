import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const contactAssociationsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAssociation: builder.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.GET_ASSOCIATION,
        method: 'GET',
        params: params,
      }),
      providesTags: ['CONTACT_ASSOCIATION'],
    }),

    postAssociation: builder.mutation({
      query: ({ body }: any) => ({
        url: END_POINTS?.POST_ASSOCIATION,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['CONTACT_ASSOCIATION'],
    }),

    getContactAssociations: builder.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.CONTACT_ASSOCIATIONS,
        method: 'GET',
        params: params,
      }),
      providesTags: ['CONTACT_ASSOCIATION', 'CONTACTS'],
    }),
  }),
});

export const {
  useGetAssociationQuery,
  usePostAssociationMutation,
  useGetContactAssociationsQuery,
} = contactAssociationsAPI;
