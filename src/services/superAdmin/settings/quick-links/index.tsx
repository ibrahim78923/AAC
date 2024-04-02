import { baseAPI } from '@/services/base-api';
import { SUPER_ADMIN_SETTINGS } from '@/routesConstants/paths';

const TAG = ['SETTINGS_QUICK_LINKS'];
export const settingsQuickLinksAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getQuickLinks: builder.query({
      query: ({ params }) => ({
        url: SUPER_ADMIN_SETTINGS?.QUICK_LINKS,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getGroupQuickLinks: builder.query({
      query: () => ({
        url: SUPER_ADMIN_SETTINGS?.QUICK_LINKS_GROUP,
        method: 'GET',
      }),
      providesTags: TAG,
    }),

    getQuickLinkById: builder.query({
      query: (id: any) => ({
        url: `${SUPER_ADMIN_SETTINGS?.QUICK_LINKS}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),

    postQuickLink: builder.mutation({
      query: ({ body }: any) => ({
        url: SUPER_ADMIN_SETTINGS?.QUICK_LINKS,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    updateQuickLink: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${SUPER_ADMIN_SETTINGS?.QUICK_LINKS}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    deleteQuickLink: builder.mutation({
      query: (id: any) => ({
        url: `${SUPER_ADMIN_SETTINGS?.QUICK_LINKS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
    }),
  }),
});

export const {
  useGetQuickLinksQuery,
  useGetGroupQuickLinksQuery,
  useGetQuickLinkByIdQuery,
  useUpdateQuickLinkMutation,
  usePostQuickLinkMutation,
  useDeleteQuickLinkMutation,
} = settingsQuickLinksAPI;
