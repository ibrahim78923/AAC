import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = ['TICKET_ASSOCIATION'];
export const contactTicketAssociationsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postTicketContactAssociations: builder.mutation({
      query: (body: any) => {
        return {
          url: END_POINTS?.TICKET,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),

    getAllTicketsContactsAssociation: builder.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.TICKET}`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: ['TICKETS'],
    }),

    getTicketRequesterContactsAssociation: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_USERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),

    getTicketCategoriesContactsAssociation: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_CATEGORIES}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.servicecategories;
      },
    }),

    getTicketDepartmentContactsAssociation: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_DEPARTMENT}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.departments;
      },
    }),

    getTicketAgentContactsAssociation: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_USERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),

    getAssociateAssetsContactsAssociation: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_ASSOCIATE_ASSET}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.inventories;
      },
    }),
  }),
});

export const {
  usePostTicketContactAssociationsMutation,
  useLazyGetAllTicketsContactsAssociationQuery,
  useLazyGetTicketRequesterContactsAssociationQuery,
  useLazyGetTicketCategoriesContactsAssociationQuery,
  useLazyGetTicketAgentContactsAssociationQuery,
  useLazyGetTicketDepartmentContactsAssociationQuery,
  useLazyGetAssociateAssetsContactsAssociationQuery,
} = contactTicketAssociationsAPI;
