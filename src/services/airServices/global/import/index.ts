import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const importFileApi = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    importFile: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.IMPORT_FILE,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
    }),
    getSignedUrlForImport: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.IMPORT_FILE_GET_SIGNED_URL,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    uploadFileTos3UsingSignedUrl: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: apiDataParameter?.url,
        method: 'PUT',
        body: apiDataParameter?.body?.file,
      }),
    }),
  }),
});

export const {
  useGetSignedUrlForImportQuery,
  useImportFileMutation,
  useUploadFileTos3UsingSignedUrlMutation,
  useLazyGetSignedUrlForImportQuery,
} = importFileApi;
