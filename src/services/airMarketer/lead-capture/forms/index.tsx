import { END_POINTS, LEAD_CAPTURE_FORM } from '@/routesConstants/endpoints';
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
      query: (body) => ({
        url: `${LEAD_CAPTURE_FORM?.DELETE_FORM}`,
        method: 'DELETE',
        body: body,
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
      query: ({ id, params }) => ({
        url: `${LEAD_CAPTURE_FORM?.GET_FORM_SUBMISSIONS}?id=${id}`,
        method: 'GET',
        params: params,
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

    getSubmissionEmails: builder.query({
      query: (formId) => ({
        url: `${LEAD_CAPTURE_FORM?.GET_SUBMISSION_EMAIL}?id=${formId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),

    getRestoreForms: builder.query({
      query: ({ params }) => ({
        url: LEAD_CAPTURE_FORM?.GET_RESTORE_FORMS,
        method: 'GET',
        params: params,
      }),
      providesTags: [TAG],
    }),

    patchRestoreForm: builder.mutation({
      query: (body) => ({
        url: `${LEAD_CAPTURE_FORM?.PATCH_RESTORE_FORM}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: [TAG],
    }),

    deleteFormPermanent: builder.mutation({
      query: (body) => ({
        url: `${LEAD_CAPTURE_FORM?.DELETE_FORM_PERMANENT}`,
        method: 'DELETE',
        body: body,
      }),
      invalidatesTags: [TAG],
    }),

    getCustomersDropdownList: builder.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.CONTACTS,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: ['CONTACTS'],
    }),

    getCustomersGroupDropdownList: builder.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.CONTACT_GROUPS,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.contactgroups;
      },
      providesTags: ['CONTACT_GROUPS'],
    }),

    getPublicFormFields: builder.query({
      query: ({ params }) => ({
        url: LEAD_CAPTURE_FORM?.FETCH_FORM_FIELDS_PUBLIC,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),

    putAddViewForm: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${LEAD_CAPTURE_FORM?.ADD_VIEW_FORM}?id=${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['LEADCAPTURE_FORM_VIEW'],
    }),

    putAddEntranceForm: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${LEAD_CAPTURE_FORM?.ADD_FORM_ENTRANCE}?id=${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['LEADCAPTURE_FORM_ENTRANCE'],
    }),

    postLeadCaptureFormSendEmail: builder.mutation({
      query: ({ body }: any) => ({
        url: END_POINTS?.CONVERSATION_EMAIL,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['LEADCAPTURE_FORM_SENDEMAIL'],
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
  useGetSubmissionEmailsQuery,
  usePostFormSubmissionsMutation,
  useGetRestoreFormsQuery,
  usePatchRestoreFormMutation,
  useDeleteFormPermanentMutation,
  useLazyGetCustomersDropdownListQuery,
  useLazyGetCustomersGroupDropdownListQuery,
  useGetPublicFormFieldsQuery,
  usePutAddViewFormMutation,
  usePutAddEntranceFormMutation,
  usePostLeadCaptureFormSendEmailMutation,
} = leadCaptureFormsAPI;
