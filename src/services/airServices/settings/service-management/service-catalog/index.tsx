import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'CATALOG';

export const serviceCatalogAPI: any = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getAirServicesSettingsServiceCatalog: builder?.query({
      query: (getServiceCatalogCategoriesParameter: any) => ({
        url: END_POINTS?.SERVICE_CATALOG,
        method: 'GET',
        params: getServiceCatalogCategoriesParameter?.queryParam,
      }),
      providesTags: [TAG],
    }),

    getAirServicesSettingsServiceCatalogCategories: builder?.query({
      query: ({ param }: any) => ({
        url: END_POINTS?.SERVICE_CATALOG_CATEGORIES,
        method: 'GET',
        params: param,
      }),
      providesTags: [TAG],
    }),

    getAirServicesSettingsServiceCatalogSingleServiceDetails: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.SERVICE_CATALOG_CATEGORIES_DETAILS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),

    deleteAirServicesSettingsServiceCatalog: builder?.mutation({
      query: (deleteServiceCatalogParameter: any) => ({
        url: END_POINTS?.DELETE_SERVICE,
        method: 'DELETE',
        params: deleteServiceCatalogParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),

    postAirServicesSettingsServiceCatalog: builder?.mutation({
      query: (payload: any) => ({
        url: END_POINTS?.ADD_SERVICE_CATALOG,
        method: 'POST',
        body: payload?.body,
      }),
      invalidatesTags: [TAG],
    }),

    patchAirServicesSettingsServiceCatalog: builder?.mutation({
      query: (putServiceCatalogParameter: any) => ({
        url: END_POINTS?.EDIT_SERVICE_CATALOG,
        method: 'PATCH',
        body: putServiceCatalogParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),

    getAirServicesSettingsServiceCategoriesDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.DROPDOWN_CATEGORIES,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.servicecategories;
      },
    }),

    getAirServicesSettingsServicesRequesterDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.DROPDOWN_REQUESTERS,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.users;
      },
    }),

    getAirServicesSettingsServicesRequestersDropdownList: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.DROPDOWN_USERS,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),

    getAirServicesSettingsServicesAgentsDropdownList: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.DROPDOWN_USERS,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),

    getAirServicesSettingsServicesAssetsCategoryDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.DROPDOWN_ASSET_TYPE_LIST,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.assettypes;
      },
    }),

    getAirServicesSettingsServicesProductCatalogDropdownList: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.PRODUCT_CATALOG_LIST,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.productcatalogs;
      },
    }),

    getAirServicesSettingsServicesSoftwareDropdownList: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.ASSETS_SOFTWARE,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.assetssoftwares;
      },
    }),

    postAirServicesSettingsAddServiceCatalog: builder?.mutation({
      query: (payload: any) => ({
        url: `${END_POINTS?.UPSERT_SERVICES_CATALOG}`,
        method: 'POST',
        body: payload?.body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useLazyGetAirServicesSettingsServiceCatalogQuery,
  useGetAirServicesSettingsServiceCatalogQuery,
  useDeleteAirServicesSettingsServiceCatalogMutation,
  usePostAirServicesSettingsServiceCatalogMutation,
  useGetAirServicesSettingsServiceCatalogCategoriesQuery,
  usePatchAirServicesSettingsServiceCatalogMutation,
  useLazyGetAirServicesSettingsServiceCategoriesDropdownQuery,
  useLazyGetAirServicesSettingsServicesAssetsCategoryDropdownQuery,
  useLazyGetAirServicesSettingsServicesRequestersDropdownListQuery,
  useLazyGetAirServicesSettingsServicesAgentsDropdownListQuery,
  useLazyGetAirServicesSettingsServicesProductCatalogDropdownListQuery,
  useLazyGetAirServicesSettingsServicesSoftwareDropdownListQuery,
  usePostAirServicesSettingsAddServiceCatalogMutation,
  useGetAirServicesSettingsServiceCatalogSingleServiceDetailsQuery,
  useGetAirServicesSettingsServicesRequestersDropdownListQuery,
  useGetAirServicesSettingsServicesAgentsDropdownListQuery,
} = serviceCatalogAPI;
