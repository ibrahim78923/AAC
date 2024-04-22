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
    stop,
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

  const { handleSubmit, reset, control, getValues } = methods;
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
      stop();
    } else {
      setIsIconVisible(false);
      start();
    }
    const { hours } = getValues();
    if (hours?.trim() !== '' && !/^\d+h\d+m$/?.test(hours)) {
      errorSnackbar(
        'Invalid format for Planned Effort. Please use format like 1h10m',
      );
      return;
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
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
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
