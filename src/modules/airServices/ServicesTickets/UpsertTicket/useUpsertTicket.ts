import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  upsertTicketDefaultValuesFunction,
  upsertTicketFormFieldsDynamic,
  upsertTicketValidationSchema,
} from './UpsertTicket.data';

import { useEffect } from 'react';
import usePath from '@/hooks/usePath';
import {
  useGetTicketsByIdQuery,
  useLazyGetAgentDropdownQuery,
  useLazyGetAssociateAssetsDropdownQuery,
  useLazyGetCategoriesDropdownQuery,
  useLazyGetDepartmentDropdownQuery,
  useLazyGetRequesterDropdownQuery,
  usePostTicketsMutation,
  usePutTicketsMutation,
} from '@/services/airServices/tickets';
import { errorSnackbar, makeDateTime, successSnackbar } from '@/utils/api';
import { MODULE_TYPE, TICKET_TYPE } from '@/constants/strings';

export const useUpsertTicket = (props: any) => {
  const {
    setIsDrawerOpen,
    ticketId,
    setSelectedTicketList,
    setFilterTicketLists,
    getTicketsListData,
    setPage,
  } = props;

  const router = useRouter();
  const theme: any = useTheme();
  const { makePath } = usePath();
  const [postTicketTrigger, postTicketStatus] = usePostTicketsMutation();
  const [putTicketTrigger, putTicketStatus] = usePutTicketsMutation();

  const getSingleTicketParameter = {
    pathParam: {
      ticketId,
    },
  };
  const { data, isLoading, isFetching, isError } = useGetTicketsByIdQuery(
    getSingleTicketParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!ticketId,
    },
  );

  const methods: any = useForm<any>({
    resolver: yupResolver(upsertTicketValidationSchema),
    defaultValues: upsertTicketDefaultValuesFunction(),
  });

  const { handleSubmit, reset } = methods;

  const submitUpsertTicket = async (formData: any) => {
    const upsertTicketFormData = new FormData();
    upsertTicketFormData?.append('requester', formData?.requester?._id);
    upsertTicketFormData?.append('subject', formData?.subject);
    !!formData?.description &&
      upsertTicketFormData?.append('description', formData?.description);
    !!formData?.category?._id &&
      upsertTicketFormData?.append('category', formData?.category?._id);
    upsertTicketFormData?.append('status', formData?.status?._id);
    upsertTicketFormData?.append('pirority', formData?.priority?._id);
    !!formData?.department?._id &&
      upsertTicketFormData?.append('department', formData?.department?._id);
    !!formData?.source &&
      upsertTicketFormData?.append('source', formData?.source?._id);
    !!formData?.impact &&
      upsertTicketFormData?.append('impact', formData?.impact?._id);
    !!formData?.agent &&
      upsertTicketFormData?.append('agent', formData?.agent?._id);
    (!!formData?.plannedEndDate || !!data?.plannedEndTime) &&
      upsertTicketFormData?.append(
        'plannedEndDate',
        makeDateTime(
          formData?.plannedEndDate,
          formData?.plannedEndTime,
        )?.toISOString(),
      );
    !!formData?.plannedEffort &&
      upsertTicketFormData?.append('plannedEffort', formData?.plannedEffort);
    formData?.attachFile !== null &&
      upsertTicketFormData?.append('fileUrl', formData?.attachFile);
    !!formData?.associatesAssets?.length &&
      upsertTicketFormData?.append(
        'associateAssets',
        formData?.associatesAssets?.map((asset: any) => asset?._id),
      );
    upsertTicketFormData?.append(
      'moduleType',
      data?.data?.[0]?.moduleType ?? MODULE_TYPE?.TICKETS,
    );
    upsertTicketFormData?.append(
      'ticketType',
      data?.data?.[0]?.ticketType ?? TICKET_TYPE?.INC,
    );
    if (!!ticketId) {
      submitUpdateTicket(upsertTicketFormData);
      return;
    }
    const postTicketParameter = {
      body: upsertTicketFormData,
    };

    try {
      await postTicketTrigger(postTicketParameter)?.unwrap();
      successSnackbar('Ticket Added Successfully');
      reset();
      getTicketsListData(1, {});
      setFilterTicketLists?.({});
      setPage?.(1);
      setIsDrawerOpen?.(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const submitUpdateTicket = async (formData: any) => {
    formData?.append('isChildTicket', data?.data?.[0]?.isChildTicket);
    formData?.append('id', ticketId);

    const putTicketParameter = {
      body: formData,
    };

    try {
      await putTicketTrigger(putTicketParameter)?.unwrap();
      successSnackbar('Ticket Updated Successfully');
      setSelectedTicketList([]);
      reset();
      getTicketsListData(1, {});
      setFilterTicketLists?.({});
      setPage?.(1);
      setIsDrawerOpen?.(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  useEffect(() => {
    reset(() => upsertTicketDefaultValuesFunction(data?.data?.[0]));
  }, [data, reset]);

  const onClose = () => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['ticketAction'],
      }),
    );
    setSelectedTicketList([]);
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
    putTicketStatus,
    postTicketStatus,
    isLoading,
    isFetching,
    ticketId,
    upsertTicketFormFields,
    isError,
  };
};
