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
  // useLazyGetTicketsDetailsByIdQuery,
} from '@/services/airServices/tickets/single-ticket-details/details';

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { makeDateTime } from '@/modules/airServices/ServicesTickets/ServicesTickets.data';
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
    ticketDetailsData.append('status', data?.status);
    ticketDetailsData.append('pirority', data?.pirority);
    ticketDetailsData.append('source', data?.source);
    ticketDetailsData.append('ticketType', data?.ticketType);
    ticketDetailsData.append('impact', data?.impact);
    ticketDetailsData.append('agent', data?.agent?._id);
    ticketDetailsData.append('category', data?.category);
    ticketDetailsData?.append('moduleType', 'TICKETS');

    ticketDetailsData.append(
      'plannedEndDate',
      makeDateTime(data?.plannedEndDate, data?.plannedEndTime)?.toISOString(),
    );
    ticketDetailsData.append('plannedEffort', data?.plannedEffort);

    const putTicketParameter = {
      body: ticketDetailsData,
      pathParam: {
        id: ticketId,
      },
    };
    try {
      const response = await putTicketTrigger(putTicketParameter)?.unwrap();
      enqueueSnackbar(response?.message ?? 'Ticket update Successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      reset();
    } catch (error) {
      enqueueSnackbar('Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  useEffect(() => {
    reset(() => ticketsDetailsDefaultValuesFunction(data?.data?.[0]));
  }, [data, reset]);

  const apiQueryAgent = useLazyGetAgentDropdownQuery();
  const ticketDetailsFormFields = dataArray(apiQueryAgent);
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
