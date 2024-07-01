import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
import { FIELDS_CONSTANTS } from '@/utils/dynamic-forms';

const transformResponse = (response: any) => {
  return response?.data?.map((field: any) => {
    let options = field?.options;

    if (field?.fieldType === FIELDS_CONSTANTS?.RHFAUTOCOMPLETE) {
      options = options?.map((option: any) => option.label);
    }

    return {
      componentProps: {
        name: field?.label,
        label: field?.label,
        placeholder: field?.placeholder,
        required: field?.isRequired,
        ...(field?.multiLine && { rows: 4, multiline: field?.multiLine }),
        options: options,
        ...(field?.fieldType === FIELDS_CONSTANTS?.RHFDATEPICKER && {
          fullWidth: true,
          textFieldProps: { readOnly: true },
        }),
        ...(field?.fieldType === FIELDS_CONSTANTS?.RHFDROPZONE && {
          fileType: field?.placeholder,
        }),
        ...(field?.fieldType === FIELDS_CONSTANTS?.RHFDATEPICKER && {
          format: field?.dateformate,
        }),
      },
      component: field?.fieldType,
      id: field?._id,
    };
  });
};

export const DynamicFieldsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    putDynamicFields: builder?.mutation({
      query: ({ putDynamicFieldsParameters }: any) => ({
        url: END_POINTS?.PUT_DYNAMIC_FIELDS,
        method: 'PUT',
        params: putDynamicFieldsParameters?.params,
        body: putDynamicFieldsParameters?.body,
      }),
    }),

    getDynamicFields: builder?.query({
      query: ({ getDynamicFieldsParameters }: any) => ({
        url: END_POINTS?.GET_DYNAMIC_FIELDS,
        method: 'GET',
        params: getDynamicFieldsParameters?.params,
      }),
      transformResponse: (response: any) => transformResponse(response),
    }),

    deleteDynamicFields: builder?.mutation({
      query: ({ deleteDynamicFieldsParameters }: any) => ({
        url: END_POINTS?.DELETE_DYNAMIC_FIELDS,
        method: 'DELETE',
        params: deleteDynamicFieldsParameters?.params,
      }),
    }),
  }),
});

export const {
  usePutDynamicFieldsMutation,
  useLazyGetDynamicFieldsQuery,
  useDeleteDynamicFieldsMutation,
} = DynamicFieldsApi;
