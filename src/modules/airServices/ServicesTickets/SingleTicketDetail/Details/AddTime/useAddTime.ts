import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import {
  useLazyGetAgentDropdownQuery,
  useLazyGetTaskByIdDropDownQuery,
  usePostTicketsTimeMutation,
} from '@/services/airServices/tickets/single-ticket-details/details';

import {
  errorSnackbar,
  filteredEmptyValues,
  successSnackbar,
} from '@/utils/api';
import { useRouter } from 'next/router';
import {
  addTimeFormDefaultValues,
  addTimeFormFieldsDynamic,
  addTimeFormValidationSchema,
} from './AddTime.data';
import { useEffect, useState } from 'react';
import {
  useLazyGetDynamicFieldsQuery,
  usePostDynamicFormAttachmentsMutation,
} from '@/services/dynamic-fields';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
  dynamicAttachmentsPost,
} from '@/utils/dynamic-forms';

export const useAddTime = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;

  const [form, setForm] = useState<any>([]);

  const [postTicketsTimeTrigger, postTicketStatus] =
    usePostTicketsTimeMutation();

  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();
  const [postAttachmentTrigger, postAttachmentStatus] =
    usePostDynamicFormAttachmentsMutation();

  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_SERVICES,
      moduleType: DYNAMIC_FIELDS?.MT_TIME_ENTRIES,
    };
    const getDynamicFieldsParameters = { params };

    try {
      const res: any = await getDynamicFieldsTrigger(
        getDynamicFieldsParameters,
      )?.unwrap();
      setForm(res);
    } catch (error: any) {
      setForm([]);
    }
  };

  useEffect(() => {
    getDynamicFormData();
  }, []);

  const router = useRouter();
  const { ticketId } = router?.query;

  const methods: any = useForm<any>({
    resolver: yupResolver(addTimeFormValidationSchema?.(form)),
    defaultValues: addTimeFormDefaultValues?.(form),
  });

  const { handleSubmit, reset, getValues } = methods;

  const onSubmit = async (data: any) => {
    const { hours } = getValues();
    if (hours?.trim() !== '' && !/^\d+h\d+m$/?.test(hours)) {
      errorSnackbar('Invalid format for hours. Please use format like 1h10m');
      return;
    }

    const filteredEmptyData = filteredEmptyValues(data);

    const customFields: any = {};
    const body: any = {};
    const attachmentPromises: Promise<any>[] = [];

    try {
      dynamicAttachmentsPost({
        form,
        data,
        attachmentPromises,
        customFields,
        postAttachmentTrigger,
      });

      await Promise?.all(attachmentPromises);

      const customFieldKeys = new Set(
        form?.map((field: any) => field?.componentProps?.label),
      );

      Object?.entries(filteredEmptyData)?.forEach(([key, value]) => {
        if (customFieldKeys?.has(key)) {
          if (value instanceof Date) {
            value = value?.toISOString();
          }
          if (
            typeof value === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT &&
            !Array?.isArray(value) &&
            value !== null
          ) {
            customFields[key] = { ...customFields[key], ...value };
          } else {
            customFields[key] = value;
          }
        } else {
          body[key] = value;
        }
      });

      if (Object?.keys(customFields)?.length > 0) {
        body.customFields = customFields;
      }

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
    getDynamicFieldsStatus,
    postAttachmentStatus,
    form,
  };
};
