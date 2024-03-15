import { yupResolver } from '@hookform/resolvers/yup';
import {
  addTimeDefaultValues,
  detailDrawerArray,
  validationSchema,
} from './DetailTicketDrawer.data';
import { useForm } from 'react-hook-form';
import {
  useLazyGetAgentDropdownQuery,
  usePostTicketsTimeMutation,
} from '@/services/airServices/tickets/single-ticket-details/details';
import { AIR_SERVICES } from '@/constants';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';

export const useDetailTicketDrawer = (props: any) => {
  const [postTicketsTimeTrigger] = usePostTicketsTimeMutation();
  const { isDrawerOpen, setIsDrawerOpen, data } = props;
  const router = useRouter();

  const apiQueryAgent = useLazyGetAgentDropdownQuery();

  const methods: any = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: addTimeDefaultValues(data),
  });
  const { handleSubmit, reset } = methods;
  const ticketDetailsFormFields = detailDrawerArray(apiQueryAgent);
  const onSubmit = async (data: any) => {
    const putTicketParameter = {
      body: data,
    };
    try {
      await postTicketsTimeTrigger(putTicketParameter)?.unwrap();
      router?.push(AIR_SERVICES?.TICKETS);
      successSnackbar(' ticket Time Added successfully');
      setIsDrawerOpen(false);
      reset();
    } catch (error) {
      errorSnackbar();
      setIsDrawerOpen(false);
    }
  };
  return {
    methods,
    handleSubmit,
    onSubmit,
    ticketDetailsFormFields,
    isDrawerOpen,
    setIsDrawerOpen,
  };
};
