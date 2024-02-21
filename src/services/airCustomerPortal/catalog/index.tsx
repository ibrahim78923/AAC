import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'SERVICE-CATALOG';
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
  }),
});

export const {
  useGetServiceCatalogQuery,
  useGetServiceCatalogCategoriesQuery,
} = catalogAPI;
