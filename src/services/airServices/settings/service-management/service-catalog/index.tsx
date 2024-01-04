import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'SERVICE-CATALOG';
const TAG_TWO = 'SERVICE_CATALOG_DROPDOWN';
const TAG_THREE = 'DROPDOWN_REQUESTER';
const TAG_FOUR = 'DROPDOWN_AGENT';
export const serviceCatalogAPI: any = baseAPI?.injectEndpoints({
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
    deleteServiceCatalog: builder?.mutation({
      query: (deleteServiceCatalogParameter: any) => ({
        url: `${END_POINTS?.DELETE_SERVICE}`,
        method: 'DELETE',
        params: deleteServiceCatalogParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
    postServiceCatalog: builder?.mutation({
      query: (payload) => ({
        url: `${END_POINTS?.ADD_SERVICE_CATALOG}`,
        method: 'POST',
        body: payload?.body,
      }),
      invalidatesTags: [TAG],
    }),
    postAddServiceCatalog: builder?.mutation({
      query: (payload) => ({
        url: `${END_POINTS?.UPSERT_SERVICES_CATALOG}`,
        method: 'POST',
        body: payload?.body,
      }),
      invalidatesTags: [TAG],
    }),
    patchServiceCatalog: builder?.mutation({
      query: (putServiceCatalogParameter: any) => ({
        url: `${END_POINTS?.EDIT_SERVICE_CATALOG}`,
        method: 'PATCH',
        body: putServiceCatalogParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    getCategoriesDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_CATEGORIES}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.servicecategories;
      },
      providesTags: [TAG_TWO],
    }),
    getCategoriesRequesterDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_REQUESTERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.users;
      },
      providesTags: [TAG_THREE],
    }),
    getCategoriesAgentDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_AGENTS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.users;
      },
      providesTags: [TAG_FOUR],
    }),
  }),
});

export const {
  useGetServiceCatalogQuery,
  useDeleteServiceCatalogMutation,
  usePostServiceCatalogMutation,
  usePostAddServiceCatalogMutation,
  useGetServiceCatalogCategoriesQuery,
  usePatchServiceCatalogMutation,
  useLazyGetCategoriesDropdownQuery,
  useGetCategoriesRequesterDropdownQuery,
  useGetCategoriesAgentDropdownQuery,
} = serviceCatalogAPI;
