import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { filteredEmptyValues } from '@/utils/api';
import { useRouter } from 'next/router';
import {
  addTimeFormDefaultValues,
  addTimeFormFieldsDynamic,
  addTimeFormValidationSchema,
} from './AddTime.data';
import { useEffect } from 'react';
import { DYNAMIC_FIELDS } from '@/utils/dynamic-forms';
import { useAddSingleServicesTicketsTasksTimeMutation } from '@/services/airServices/tickets/single-ticket-details/details';
import { REGEX } from '@/constants/validation';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useDynamicForm } from '@/components/DynamicForm/useDynamicForm';

export const useAddTime = (props: any) => {
  const { setIsDrawerOpen } = props;

  const [postTicketsTimeTrigger, postTicketStatus] =
    useAddSingleServicesTicketsTasksTimeMutation();

  const dynamicFormProps = {
    productType: DYNAMIC_FIELDS?.PT_SERVICES,
    moduleType: DYNAMIC_FIELDS?.MT_TIME_ENTRIES,
  };

  const {
    form,
    handleUploadAttachments,
    isDynamicFormLoading,
    hasDynamicFormError,
    attachmentsApiCallInProgress,
    getDynamicFormData,
  } = useDynamicForm(dynamicFormProps);

  useEffect(() => {
    getDynamicFormData();
  }, []);

  const router = useRouter();
  const { ticketId } = router?.query;

  const methods: any = useForm<any>({
    resolver: yupResolver(addTimeFormValidationSchema?.(form)),
    defaultValues: addTimeFormDefaultValues?.(form),
  });

  const { handleSubmit, reset, getValues, setError, setValue } = methods;

  const onSubmit = async (data: any) => {
    const { hours } = getValues();

    if (hours?.trim() !== '' && !REGEX?.HOURS_AND_MINUTES?.test(hours)) {
      setError('hours', {
        message: 'Invalid format for hours. Please use format like 1h10m',
      });
      return;
    }
    const filteredEmptyData = filteredEmptyValues(data);

    try {
      const { customFields }: any = await handleUploadAttachments?.(
        data,
        filteredEmptyData,
      );

      const postData = {
        ticketId: ticketId,
        taskId: data?.task?._id,
        agentId: data?.agent?._id,
        hours: data?.hours,
        status: data?.status?._id,
        on: data?.on,
        note: data?.note,
        customFields,
      };

      const putTicketParameter = {
        body: postData,
      };

      await postTicketsTimeTrigger(putTicketParameter)?.unwrap();
      successSnackbar('Ticket time added successfully');
      closeDrawer?.();
    } catch (e: any) {
      errorSnackbar(e?.data?.message);
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen?.(false);
    reset();
  };

  const addTimeFormFields = addTimeFormFieldsDynamic(setValue, getValues);
  const apiCallInProgress =
    postTicketStatus?.isLoading || attachmentsApiCallInProgress;

  return {
    methods,
    handleSubmit,
    onSubmit,
    addTimeFormFields,
    postTicketStatus,
    closeDrawer,
    isDynamicFormLoading,
    hasDynamicFormError,
    apiCallInProgress,
    form,
    getDynamicFormData,
  };
};
