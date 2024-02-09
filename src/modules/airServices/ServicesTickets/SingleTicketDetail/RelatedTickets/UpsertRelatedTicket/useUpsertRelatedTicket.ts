import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  upsertTicketDefaultValuesFunction,
  upsertTicketFormFieldsDynamic,
  upsertTicketValidationSchema,
} from './UpsertRelatedTicket.data';

import { useEffect } from 'react';
import {
  useGetTicketsByIdQuery,
  useLazyGetAgentDropdownQuery,
  useLazyGetAssociateAssetsDropdownQuery,
  useLazyGetCategoriesDropdownQuery,
  useLazyGetDepartmentDropdownQuery,
  useLazyGetRequesterDropdownQuery,
  usePutTicketsMutation,
} from '@/services/airServices/tickets';
import { useAddChildTicketsMutation } from '@/services/airServices/tickets/single-ticket-details/related-tickets';
import { errorSnackbar, makeDateTime, successSnackbar } from '@/utils/api';

export const useUpsertRelatedTicket = (props: any) => {
  const { setIsDrawerOpen, childTicketId, setSelectedChildTickets } = props;

  const router = useRouter();
  const { ticketId } = router?.query;
  const theme: any = useTheme();
  const [postChildTicketTrigger, postChildTicketStatus] =
    useAddChildTicketsMutation();
  const [putChildTicketTrigger, putChildTicketStatus] = usePutTicketsMutation();

  const getSingleTicketParameter = {
    pathParam: {
      ticketId,
    },
  };

  const { data, isLoading, isFetching, isError } = useGetTicketsByIdQuery(
    getSingleTicketParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!childTicketId,
    },
  );

  const methods: any = useForm<any>({
    resolver: yupResolver(upsertTicketValidationSchema),
    defaultValues: upsertTicketDefaultValuesFunction(),
  });

  const { handleSubmit, reset } = methods;

  const submitUpsertTicket = async (data: any) => {
    const upsertTicketFormData = new FormData();
    upsertTicketFormData?.append('requester', data?.requester?._id);
    upsertTicketFormData?.append('subject', data?.subject);
    !!data?.description &&
      upsertTicketFormData?.append('description', data?.description);
    !!data?.category?._id &&
      upsertTicketFormData?.append('category', data?.category?._id);
    upsertTicketFormData?.append('status', data?.status?._id);
    upsertTicketFormData?.append('pirority', data?.priority?._id);
    !!data?.department?._id &&
      upsertTicketFormData?.append('department', data?.department?._id);
    !!data?.source && upsertTicketFormData?.append('source', data?.source?._id);
    !!data?.impact && upsertTicketFormData?.append('impact', data?.impact?._id);
    !!data?.agent && upsertTicketFormData?.append('agent', data?.agent?._id);
    (!!data?.plannedEndDate || !!data?.plannedEndTime) &&
      upsertTicketFormData?.append(
        'plannedEndDate',
        makeDateTime(data?.plannedEndDate, data?.plannedEndTime)?.toISOString(),
      );
    !!data?.plannedEffort &&
      upsertTicketFormData?.append('plannedEffort', data?.plannedEffort);
    data?.attachFile !== null &&
      typeof data?.attachFile !== 'string' &&
      upsertTicketFormData?.append('fileUrl', data?.attachFile);
    !!data?.associatesAssets?.length &&
      upsertTicketFormData?.append(
        'associateAssets',
        data?.associatesAssets?.map((asset: any) => asset?._id),
      );
    upsertTicketFormData?.append('moduleType', 'TICKETS');
    upsertTicketFormData?.append('ticketType', 'INC');
    if (!!childTicketId) {
      submitUpdateTicket(upsertTicketFormData);
      return;
    }
    const postTicketParameter = {
      body: upsertTicketFormData,
      queryParams: {
        id: ticketId,
      },
    };

    try {
      await postChildTicketTrigger(postTicketParameter)?.unwrap();
      successSnackbar('Child ticket added successfully');
      reset();
      setIsDrawerOpen?.(false);
    } catch (error) {
      errorSnackbar();
    }
  };

  const submitUpdateTicket = async (data: any) => {
    data?.append('isChildTicket', true);
    const putTicketParameter = {
      body: data,
      pathParam: {
        id: childTicketId,
      },
    };
    try {
      await putChildTicketTrigger(putTicketParameter)?.unwrap();
      successSnackbar('Child ticket updated successfully');
      setSelectedChildTickets([]);
      reset();
      setIsDrawerOpen?.(false);
    } catch (error) {
      errorSnackbar();
    }
  };
  useEffect(() => {
    reset(() => upsertTicketDefaultValuesFunction(data?.data?.[0]));
  }, [data, reset]);

  const onClose = () => {
    setSelectedChildTickets([]);
    reset?.();
    setIsDrawerOpen?.(false);
  };

  const apiQueryDepartment = useLazyGetDepartmentDropdownQuery();
  const apiQueryRequester = useLazyGetRequesterDropdownQuery();
  const apiQueryAgent = useLazyGetAgentDropdownQuery();
  const apiQueryAssociateAsset = useLazyGetAssociateAssetsDropdownQuery();
  const apiQueryCategories = useLazyGetCategoriesDropdownQuery();

  const upsertTicketFormFields = upsertTicketFormFieldsDynamic(
    apiQueryRequester,
    apiQueryDepartment,
    apiQueryAgent,
    apiQueryCategories,
    apiQueryAssociateAsset,
    router,
  );

  return {
    router,
    theme,
    handleSubmit,
    submitUpsertTicket,
    methods,
    onClose,
    postChildTicketStatus,
    putChildTicketStatus,
    isLoading,
    isFetching,
    ticketId,
    upsertTicketFormFields,
    isError,
  };
};
