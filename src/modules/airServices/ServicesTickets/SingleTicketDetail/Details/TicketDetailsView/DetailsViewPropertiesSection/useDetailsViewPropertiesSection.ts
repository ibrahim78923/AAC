import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  dataArray,
  ticketsDetailsDefaultValuesFunction,
  validationSchema,
} from './DetailsViewPropertiesSection.data';
import {
  useLazyGetAgentDropdownQuery,
  usePutTicketsMutation,
  useLazyGetCategoriesDropdownQuery,
  useGetTicketsDetailsByIdQuery,
} from '@/services/airServices/tickets/single-ticket-details/details';

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { errorSnackbar, makeDateTime, successSnackbar } from '@/utils/api';
import { AIR_SERVICES } from '@/constants';

export const useDetailsViewPropertiesSection = () => {
  const router = useRouter();
  const { ticketId } = router?.query;
  const [putTicketTrigger, putTicketStatus] = usePutTicketsMutation();
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
    resolver: yupResolver(validationSchema),
    defaultValues: ticketsDetailsDefaultValuesFunction(),
  });

  const { handleSubmit, reset } = methods;
  const onSubmit = async (formData: any) => {
    const ticketDetailsData = new FormData();
    ticketDetailsData?.append('requester', data?.data?.[0]?.requester);
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
    ticketDetailsData?.append('moduleType', data?.data?.[0]?.moduleType);

    (!!formData?.plannedEndDate || !!formData?.plannedEndTime) &&
      ticketDetailsData?.append(
        'plannedEndDate',
        makeDateTime(
          formData?.plannedEndDate,
          formData?.plannedEndTime,
        )?.toISOString(),
      );
    ticketDetailsData.append('plannedEffort', formData?.plannedEffort);
    ticketDetailsData?.append('isChildTicket', data?.data?.[0]?.isChildTicket);
    ticketDetailsData?.append('id', ticketId as string);

    const putTicketParameter = {
      body: ticketDetailsData,
    };
    try {
      await putTicketTrigger(putTicketParameter)?.unwrap();
      router?.push(AIR_SERVICES?.TICKETS);
      successSnackbar(' ticket updated successfully');
      reset();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  useEffect(() => {
    reset(() => ticketsDetailsDefaultValuesFunction(data?.data?.[0]));
  }, [data, reset]);

  const apiQueryAgent = useLazyGetAgentDropdownQuery();
  const apiQueryCategory = useLazyGetCategoriesDropdownQuery();
  const ticketDetailsFormFields = dataArray(apiQueryAgent, apiQueryCategory);
  return {
    methods,
    handleSubmit,
    onSubmit,
    data,
    ticketDetailsFormFields,
    isLoading,
    isFetching,
    isError,
    putTicketStatus,
  };
};
