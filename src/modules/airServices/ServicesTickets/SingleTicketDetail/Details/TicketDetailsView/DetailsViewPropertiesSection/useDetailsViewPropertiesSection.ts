import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  dataArray,
  ticketsDetailsDefaultValuesFunction,
  validationSchema,
} from './DetailsViewPropertiesSection.data';
import {
  useGetTicketsDetailsByIdQuery,
  useLazyGetAgentDropdownQuery,
  usePutTicketsMutation,
  useLazyGetCategoriesDropdownQuery,
} from '@/services/airServices/tickets/single-ticket-details/details';

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { errorSnackbar, makeDateTime, successSnackbar } from '@/utils/api';
import { AIR_SERVICES } from '@/constants';

export const useDetailsViewPropertiesSection = () => {
  const router = useRouter();
  const { ticketId } = router?.query;
  const [putTicketTrigger] = usePutTicketsMutation();
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

  const requester = data?.data[0]?.requester;

  const onSubmit = async (data: any) => {
    const ticketDetailsData = new FormData();
    ticketDetailsData?.append('requester', requester);
    ticketDetailsData.append('status', data?.status?._id);
    ticketDetailsData.append('pirority', data?.priority?._id);
    !!data?.source && ticketDetailsData.append('source', data?.source?._id);
    ticketDetailsData.append('ticketType', data?.ticketType);
    !!data?.impact && ticketDetailsData.append('impact', data?.impact?._id);
    !!data?.agent && ticketDetailsData.append('agent', data?.agent?._id);
    ticketDetailsData.append('category', data?.category?._id);
    ticketDetailsData?.append('moduleType', 'TICKETS');

    (!!data?.plannedEndDate || !!data?.plannedEndTime) &&
      ticketDetailsData?.append(
        'plannedEndDate',
        makeDateTime(data?.plannedEndDate, data?.plannedEndTime)?.toISOString(),
      );
    ticketDetailsData.append('plannedEffort', data?.plannedEffort);
    ticketDetailsData?.append('isChildTicket', false + '');
    ticketDetailsData?.append('id', ticketId as string);

    const putTicketParameter = {
      body: ticketDetailsData,
    };
    try {
      await putTicketTrigger(putTicketParameter)?.unwrap();
      router?.push(AIR_SERVICES?.TICKETS);
      successSnackbar(' ticket updated successfully');
      reset();
    } catch (error) {
      errorSnackbar();
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
  };
};
