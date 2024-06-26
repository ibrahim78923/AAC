import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import {
  useLazyGetAgentDropdownQuery,
  useLazyGetTaskByIdDropDownQuery,
  usePostTicketsTimeMutation,
} from '@/services/airServices/tickets/single-ticket-details/details';

import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import {
  addTimeFormDefaultValues,
  addTimeFormFieldsDynamic,
  addTimeFormValidationSchema,
} from './AddTime.data';

export const useAddTime = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;

  const [postTicketsTimeTrigger, postTicketStatus] =
    usePostTicketsTimeMutation();

  const router = useRouter();
  const { ticketId } = router?.query;

  const methods: any = useForm<any>({
    resolver: yupResolver(addTimeFormValidationSchema),
    defaultValues: addTimeFormDefaultValues(),
  });

  const { handleSubmit, reset, getValues } = methods;

  const onSubmit = async (data: any) => {
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
      successSnackbar('Ticket time added successfully');
      closeDrawer?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen?.(false);
    reset();
  };

  const apiQueryAgent = useLazyGetAgentDropdownQuery();
  const apiQueryTask = useLazyGetTaskByIdDropDownQuery();

  const addTimeFormFields = addTimeFormFieldsDynamic(
    apiQueryAgent,
    apiQueryTask,
    ticketId,
  );

  return {
    methods,
    handleSubmit,
    onSubmit,
    addTimeFormFields,
    isDrawerOpen,
    setIsDrawerOpen,
    postTicketStatus,
    closeDrawer,
  };
};
