import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  upsertTicketDefaultValuesFunction,
  upsertTicketFormFieldsDynamic,
  upsertTicketValidationSchema,
} from './UpsertTicket.data';
import { enqueueSnackbar } from 'notistack';

import { useEffect } from 'react';
import usePath from '@/hooks/usePath';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
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
import { makeDateTime } from '../ServicesTickets.data';

export const useUpsertTicket = (props: any) => {
  const {
    setIsDrawerOpen,
    ticketId,
    setSelectedTicketList,
    setFilterTicketLists,
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

  const submitUpsertTicket = async (data: any) => {
    setFilterTicketLists({});

    const upsertTicketFormData = new FormData();
    upsertTicketFormData?.append('requester', data?.requester?._id);
    upsertTicketFormData?.append('subject', data?.subject);
    !!data?.description &&
      upsertTicketFormData?.append('description', data?.description);
    !!data?.category?._id &&
      upsertTicketFormData?.append('category', data?.category?._id);
    upsertTicketFormData?.append('status', data?.status?._id);
    upsertTicketFormData?.append('pirority', data?.priority);
    !!data?.department?._id &&
      upsertTicketFormData?.append('department', data?.department?._id);
    !!data?.source && upsertTicketFormData?.append('source', data?.source);
    !!data?.impact && upsertTicketFormData?.append('impact', data?.impact);
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
    if (!!ticketId) {
      submitUpdateTicket(upsertTicketFormData);
      return;
    }
    const postTicketParameter = {
      body: upsertTicketFormData,
    };

    try {
      const response = await postTicketTrigger(postTicketParameter)?.unwrap();
      enqueueSnackbar(response?.message ?? 'Ticket Added Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      reset();
      setIsDrawerOpen?.(false);
    } catch (error) {
      enqueueSnackbar('Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const submitUpdateTicket = async (data: any) => {
    const putTicketParameter = {
      body: data,
      pathParam: {
        id: ticketId,
      },
    };
    try {
      const response = await putTicketTrigger(putTicketParameter)?.unwrap();
      enqueueSnackbar(response?.message ?? 'Ticket Created Successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setSelectedTicketList([]);
      reset();
      setIsDrawerOpen?.(false);
    } catch (error) {
      enqueueSnackbar('Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
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
    postTicketStatus,
    isLoading,
    isFetching,
    putTicketStatus,
    ticketId,
    upsertTicketFormFields,
    isError,
  };
};
