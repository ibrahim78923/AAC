import { LEAD_CAPTURE_FORM } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'LEAD_CAPTURE_FORM';

export const leadCaptureFormsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getLeadCaptureForm: builder.query({
      query: ({ params }) => ({
        url: LEAD_CAPTURE_FORM?.GET_FORM,
        method: 'GET',
        params: params,
      }),
      providesTags: [TAG],
    }),

    getLeadCaptureFormById: builder.query({
      query: ({ id }: any) => ({
        url: `${LEAD_CAPTURE_FORM?.GET_FORM_BY_ID}?id=${id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),

    postLeadCaptureForm: builder.mutation({
      query: ({ body }: any) => ({
        url: LEAD_CAPTURE_FORM?.CREATE_FORM,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: [TAG],
    }),

    updateLeadCaptureForm: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${LEAD_CAPTURE_FORM?.UPDATE_FORM}?id=${id}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: [TAG],
    }),

    deleteLeadCaptureForm: builder.mutation({
      query: (id: any) => ({
        url: `${LEAD_CAPTURE_FORM?.DELETE_FORM}?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAG],
    }),

    getManageFieldById: builder.query({
      query: ({ id }: any) => ({
        url: `${LEAD_CAPTURE_FORM?.GET_MANAGE_FIELD}?id=${id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),

    postManageFields: builder.mutation({
      query: ({ body }: any) => ({
        url: LEAD_CAPTURE_FORM?.POST_MANAGE_FIELDS,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: [TAG],
    }),

    getFormSubmissions: builder.query({
      query: ({ id }: any) => ({
        url: `${LEAD_CAPTURE_FORM?.GET_FORM_SUBMISSIONS}?id=${id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),

    postFormSubmissions: builder.mutation({
      query: ({ body }: any) => ({
        url: LEAD_CAPTURE_FORM?.POST_FORM_SUBMISSIONS,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetLeadCaptureFormQuery,
  useGetLeadCaptureFormByIdQuery,
  usePostLeadCaptureFormMutation,
  useUpdateLeadCaptureFormMutation,
  useDeleteLeadCaptureFormMutation,
  useGetManageFieldByIdQuery,
  usePostManageFieldsMutation,
  useGetFormSubmissionsQuery,
  usePostFormSubmissionsMutation,
} = leadCaptureFormsAPI;
