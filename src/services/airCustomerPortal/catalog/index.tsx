import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'SERVICE-CATALOG';
const TAG_TWO = 'DROPDOWN_REQUESTER';
const TAG_THREE = 'TICKETS';
export const catalogAPI: any = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getServiceCatalog: builder?.query({
      query: (getServiceCatalogCategoriesParameter) => ({
        url: `${END_POINTS?.SERVICE_CATALOG}`,
        method: 'GET',
        params: getServiceCatalogCategoriesParameter?.queryParam,
      }),
      providesTags: [TAG],
    }),
    getServiceCatalogCategories: builder?.query({
      query: ({ param }) => ({
        url: `${END_POINTS?.SERVICE_CATALOG_CATEGORIES}`,
        method: 'GET',
        params: param,
      }),
      providesTags: [TAG],
    }),
    getServiceCatalogCategoriesDetails: builder?.query({
      query: (getServiceCatalogCategoriesDetailsParameter) => ({
        url: `${END_POINTS?.SERVICE_CATALOG_CATEGORIES_DETAILS}`,
        method: 'GET',
        params: getServiceCatalogCategoriesDetailsParameter?.queryParam,
      }),
      providesTags: [TAG],
    }),
    getRequesterDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_REQUESTERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.users;
      },
      providesTags: [TAG_TWO],
    }),
    postTickets: builder?.mutation({
      query: (postTicketParameter: any) => ({
        url: `${END_POINTS?.TICKET}`,
        method: 'POST',
        body: postTicketParameter?.body,
      }),
      invalidatesTags: [TAG_THREE],
    }),
  }),
});

export const {
  useGetServiceCatalogQuery,
  useGetServiceCatalogCategoriesQuery,
  useGetServiceCatalogCategoriesDetailsQuery,
  useLazyGetRequesterDropdownQuery,
  usePostTicketsMutation,
} = catalogAPI;
