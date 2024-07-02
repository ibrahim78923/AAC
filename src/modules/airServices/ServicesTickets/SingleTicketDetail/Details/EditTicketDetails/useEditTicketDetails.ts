import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import {
  useGetTicketsDetailsByIdQuery,
  useEditTicketsDetailsMutation,
  useLazyGetAgentDropdownForEditTicketDetailsQuery,
  useLazyGetCategoriesDropdownForEditTicketDetailsQuery,
} from '@/services/airServices/tickets/single-ticket-details/details';

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { AIR_SERVICES } from '@/constants';
import { ARRAY_INDEX } from '@/constants/strings';
import {
  editTicketDetailsDefaultValuesDynamic,
  editTicketDetailsFormFieldsDynamic,
  editTicketDetailsValidationSchema,
} from './EditTicketDetails.data';

export const useEditTicketDetails = () => {
  const router = useRouter();
  const { ticketId } = router?.query;
  const [editTicketsDetailsTrigger, editTicketsDetailsStatus] =
    useEditTicketsDetailsMutation();
  const getSingleTicketParameter = {
    pathParam: {
      ticketId,
    },
  };

  const { data, isLoading, isFetching, isError } =
    useGetTicketsDetailsByIdQuery(getSingleTicketParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!ticketId,
    });

  const methods: any = useForm<any>({
    resolver: yupResolver(editTicketDetailsValidationSchema),
    defaultValues: editTicketDetailsDefaultValuesDynamic(),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (formData: any) => {
    const ticketDetailsData = new FormData();
    ticketDetailsData?.append(
      'requester',
      data?.data?.[ARRAY_INDEX?.ZERO]?.requester,
    );
    ticketDetailsData.append('status', formData?.status?._id);
    ticketDetailsData.append('pirority', formData?.priority?._id);
    !!formData?.source &&
      ticketDetailsData.append('source', formData?.source?._id);
    ticketDetailsData.append('ticketType', formData?.ticketType);
    !!formData?.impact &&
      ticketDetailsData.append('impact', formData?.impact?._id);
    !!formData?.agent &&
      ticketDetailsData.append('agent', formData?.agent?._id);
    !!formData?.category &&
      ticketDetailsData.append('category', formData?.category?._id);
    ticketDetailsData?.append(
      'moduleType',
      data?.data?.[ARRAY_INDEX?.ZERO]?.moduleType,
    );

    !!formData?.plannedEndDate &&
      ticketDetailsData?.append(
        'plannedEndDate',
        formData?.plannedEndDate?.toISOString(),
      );
    ticketDetailsData.append('plannedEffort', formData?.plannedEffort);
    ticketDetailsData?.append(
      'isChildTicket',
      data?.data?.[ARRAY_INDEX?.ZERO]?.isChildTicket,
    );
    ticketDetailsData?.append('id', ticketId as string);

    const editTicketsDetailsParameter = {
      body: ticketDetailsData,
    };
    try {
      await editTicketsDetailsTrigger(editTicketsDetailsParameter)?.unwrap();
      router?.push(AIR_SERVICES?.TICKETS);
      successSnackbar('ticket updated successfully');
      reset();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  useEffect(() => {
    reset(() =>
      editTicketDetailsDefaultValuesDynamic(data?.data?.[ARRAY_INDEX?.ZERO]),
    );
  }, [data, reset]);

  const apiQueryAgent = useLazyGetAgentDropdownForEditTicketDetailsQuery();
  const apiQueryCategory =
    useLazyGetCategoriesDropdownForEditTicketDetailsQuery();

  const ticketDetailsFormFields = editTicketDetailsFormFieldsDynamic(
    apiQueryAgent,
    apiQueryCategory,
  );
  return {
    methods,
    handleSubmit,
    onSubmit,
    data,
    ticketDetailsFormFields,
    isLoading,
    isFetching,
    isError,
    editTicketsDetailsStatus,
  };
};
