import { COMMON_CONTRACTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const commonContractsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    createCommonContractTemplate: builder.mutation({
      query: (body) => ({
        url: COMMON_CONTRACTS?.TEMPLATE,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['COMMON_CONTRACTS'],
    }),

    createCommonContract: builder.mutation({
      query: (body) => ({
        url: COMMON_CONTRACTS?.POST_COMMOM_CONTRACT,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['COMMON_CONTRACTS'],
    }),

    postSignAndSend: builder.mutation({
      query: (body) => ({
        url: COMMON_CONTRACTS?.POST_COMMOM_CONTRACT,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['COMMON_CONTRACTS'],
    }),

    getCommonContractTemplates: builder.query({
      query: (params) => ({
        url: COMMON_CONTRACTS?.TEMPLATE,
        method: 'GET',
        params: params,
      }),
      providesTags: ['COMMON_CONTRACTS'],
    }),

    getCommonContractTemplateById: builder.query({
      query: (id: any) => ({
        url: `${COMMON_CONTRACTS?.TEMPLATE}/${id}`,
        method: 'GET',
      }),
      providesTags: ['COMMON_CONTRACTS'],
    }),

    getCommonContractById: builder.query({
      query: (id: any) => ({
        url: `${COMMON_CONTRACTS?.GET_CONTRACT_BY_ID}/${id}`,
        method: 'GET',
      }),
      providesTags: ['COMMON_CONTRACTS'],
    }),

    getPublicCommonContractById: builder.query({
      query: (id: any) => ({
        url: `${COMMON_CONTRACTS?.GET_PUBLIC_CONTRACT_BY_ID}/${id}`,
        method: 'GET',
      }),
      providesTags: ['COMMON_CONTRACTS'],
    }),

    getCommonContractTemplateRecentlyUsed: builder.query({
      query: (params) => ({
        url: COMMON_CONTRACTS?.GET_RECENTLY_USED_TEMPLATES,
        method: 'GET',
        params,
      }),
      providesTags: ['COMMON_CONTRACTS'],
    }),

    updateCommonContractTemplate: builder.mutation({
      query: ({ id, body }) => ({
        url: `${COMMON_CONTRACTS?.TEMPLATE}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['COMMON_CONTRACTS'],
    }),

    updateCommonContract: builder.mutation({
      query: ({ id, body }) => ({
        url: `${COMMON_CONTRACTS?.GET_CONTRACT_BY_ID}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['COMMON_CONTRACTS'],
    }),

    putContractSign: builder.mutation({
      query: ({ body }) => ({
        url: COMMON_CONTRACTS?.PUT_CONTRACT_PUBLIC_SIGN,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['COMMON_CONTRACTS'],
    }),

    // deleteContact: builder.mutation({
    //   query: ({ contactIds }: any) => ({
    //     url: `${END_POINTS?.CONTACTS}`,
    //     method: 'DELETE',
    //     body: { contactIds },
    //   }),
    //   invalidatesTags: ['COMMON_CONTRACTS'],
    // }),

    // putContactCustomizedColumns: builder.mutation({
    //   query: ({ body }: any) => ({
    //     url: `${END_POINTS?.CUSTOMIZE_COLUMNS}`,
    //     method: 'PUT',
    //     body,
    //   }),
    //   invalidatesTags: ['CONTACTS', 'CUSTOMIZE'],
    // }),

    // getContactDropdownList: builder?.query({
    //   query: ({ params }) => ({
    //     url: `${END_POINTS?.CONTACTS}`,
    //     method: 'GET',
    //     params,
    //   }),
    //   transformResponse: (response: any) => {
    //     if (response) return response?.data;
    //   },
    //   providesTags: ['CONTACTS'],
    // }),
  }),
});

export const {
  useCreateCommonContractTemplateMutation,
  useGetCommonContractTemplatesQuery,
  useGetCommonContractTemplateByIdQuery,
  useGetCommonContractByIdQuery,
  useGetCommonContractTemplateRecentlyUsedQuery,
  useUpdateCommonContractTemplateMutation,
  useUpdateCommonContractMutation,
  useCreateCommonContractMutation,
  usePostSignAndSendMutation,
  useGetPublicCommonContractByIdQuery,
  usePutContractSignMutation,
} = commonContractsAPI;
