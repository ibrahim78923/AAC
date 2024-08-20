import { Theme, useTheme } from '@mui/material';
import { NextRouter, useRouter } from 'next/router';
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
  useLazyGetAgentDropdownForTicketsQuery,
  useLazyGetAirServicesAllUsersAsRequestersDropdownListQuery,
  useLazyGetAssociateAssetsDropdownForTicketsQuery,
  useLazyGetCategoriesDropdownForTicketsQuery,
  useLazyGetDepartmentDropdownForTicketsQuery,
} from '@/services/airServices/tickets';

import {
  useAddChildTicketsMutation,
  usePutChildTicketsMutation,
} from '@/services/airServices/tickets/single-ticket-details/related-tickets';
import { errorSnackbar, makeDateTime, successSnackbar } from '@/utils/api';
import { RelatedTicketsPortalComponentPropsI } from '../RelatedTickets.interface';
import { MODULE_TYPE, TICKET_TYPE } from '@/constants/strings';

export const useUpsertRelatedTicket = (
  props: RelatedTicketsPortalComponentPropsI,
) => {
  const { setIsPortalOpen, childTicketId, setSelectedChildTickets } = props;

  const router: NextRouter = useRouter();
  const { ticketId } = router?.query;
  const theme: Theme = useTheme();
  const [postChildTicketTrigger, postChildTicketStatus] =
    useAddChildTicketsMutation();
  const [putChildTicketTrigger, putChildTicketStatus] =
    usePutChildTicketsMutation();

  const getSingleTicketParameter = {
    pathParam: {
      ticketId: childTicketId,
    },
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useGetTicketsByIdQuery(getSingleTicketParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!childTicketId,
    });

  const methods: any = useForm<any>({
    resolver: yupResolver(upsertTicketValidationSchema),
    defaultValues: upsertTicketDefaultValuesFunction(),
  });

  const { handleSubmit, reset, getValues } = methods;

  const submitUpsertTicket = async (data: any) => {
    const { plannedEffort } = getValues();
    if (plannedEffort?.trim() !== '' && !/^\d+h\d+m$/?.test(plannedEffort)) {
      errorSnackbar(
        'Invalid format for Planned Effort. Please use format like 1h10m',
      );
      return;
    }

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
    !!data?.plannedEndDate &&
      upsertTicketFormData?.append(
        'plannedEndDate',
        makeDateTime(data?.plannedEndDate, new Date())?.toISOString(),
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
    upsertTicketFormData?.append('moduleType', MODULE_TYPE?.TICKETS);
    upsertTicketFormData?.append('ticketType', TICKET_TYPE?.INC);
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
      onClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const submitUpdateTicket = async (data: any) => {
    data?.append('isChildTicket', true);
    data?.append('id', childTicketId);

    const putTicketParameter = {
      body: data,
    };

    try {
      await putChildTicketTrigger(putTicketParameter)?.unwrap();
      successSnackbar('Child ticket updated successfully');
      onClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  useEffect(() => {
    reset(() => upsertTicketDefaultValuesFunction(data?.data?.[0]));
  }, [data, reset]);

  const onClose = () => {
    setSelectedChildTickets([]);
    reset?.();
    setIsPortalOpen?.({});
  };

  const apiQueryDepartment = useLazyGetDepartmentDropdownForTicketsQuery();
  const apiQueryRequester =
    useLazyGetAirServicesAllUsersAsRequestersDropdownListQuery();
  const apiQueryAgent = useLazyGetAgentDropdownForTicketsQuery();
  const apiQueryAssociateAsset =
    useLazyGetAssociateAssetsDropdownForTicketsQuery();
  const apiQueryCategories = useLazyGetCategoriesDropdownForTicketsQuery();

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
    childTicketId,
    refetch,
  };
};
