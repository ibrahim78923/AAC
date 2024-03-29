import { yupResolver } from '@hookform/resolvers/yup';
import {
  addTimeDefaultValues,
  detailDrawerArray,
  validationSchema,
} from './DetailTicketDrawer.data';
import { useForm, useWatch } from 'react-hook-form';
import {
  useLazyGetAgentDropdownQuery,
  useLazyGetTaskByIdDropDownQuery,
  usePostTicketsTimeMutation,
} from '@/services/airServices/tickets/single-ticket-details/details';

import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';

export const useDetailTicketDrawer = (props: any) => {
  const [postTicketsTimeTrigger] = usePostTicketsTimeMutation();
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    start,
    pause,
    setIsIconVisible,
    isLoading,
  } = props;
  const router = useRouter();
  let booleanVar = false;
  const { ticketId } = router?.query;
  const apiQueryAgent = useLazyGetAgentDropdownQuery();

  const methods: any = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: addTimeDefaultValues(),
  });
  const apiQueryTask = useLazyGetTaskByIdDropDownQuery();

  const { handleSubmit, reset, control } = methods;
  const ticketDetailsFormFields = detailDrawerArray(
    apiQueryAgent,
    apiQueryTask,
    ticketId,
  );
  const results = useWatch({ control, name: 'hours' });

  if (results.length > 0) {
    booleanVar = true;
  } else {
    booleanVar = false;
  }

  const onSubmit = async (data: any) => {
    if (booleanVar === true) {
      setIsIconVisible(true);
      pause();
    } else {
      setIsIconVisible(false);
      start();
    }

    const postData = {
      ticketId: ticketId,
      taskId: data?.task?._id,
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
    booleanVar,
    results,
    isLoading,
  };
};
