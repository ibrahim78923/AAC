import { yupResolver } from '@hookform/resolvers/yup';
import {
  addTimeDefaultValues,
  detailDrawerArray,
  validationSchema,
} from './DetailTicketDrawer.data';
import { useForm } from 'react-hook-form';
import {
  useLazyGetAgentDropdownQuery,
  useLazyGetTaskByIdDropDownQuery,
  usePostTicketsTimeMutation,
} from '@/services/airServices/tickets/single-ticket-details/details';

import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';

export const useDetailTicketDrawer = (props: any) => {
  const [postTicketsTimeTrigger] = usePostTicketsTimeMutation();
  const { isDrawerOpen, setIsDrawerOpen } = props;
  const router = useRouter();

  const { ticketId } = router?.query;
  const apiQueryAgent = useLazyGetAgentDropdownQuery();

  const methods: any = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: addTimeDefaultValues(),
  });
  const apiQueryTask = useLazyGetTaskByIdDropDownQuery();

  const { handleSubmit, reset } = methods;
  const ticketDetailsFormFields = detailDrawerArray(
    apiQueryAgent,
    apiQueryTask,
  );

  const onSubmit = async (data: any) => {
    const postData = {
      ticketId: ticketId,
      taskId: '65e9435fb36acb14e0443372',
      agentId: data?.agent?._id,
      hours: data?.hours,
      status: data?.status?._id,
      on: data?.on,
      note: data?.note,
    };

    const putTicketParameter = {
      body: postData,
    };
    try {
      await postTicketsTimeTrigger(putTicketParameter)?.unwrap();
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
