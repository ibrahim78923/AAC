import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  upsertTicketTaskFormDefaultValues,
  upsertTicketTaskFormFormFieldsDynamic,
  upsertTicketTaskFormValidationSchema,
} from './UpsertTasks.data';
import {
  errorSnackbar,
  filteredEmptyValues,
  successSnackbar,
} from '@/utils/api';
import { useRouter } from 'next/router';
import {
  usePatchTaskByIdMutation,
  usePostTaskByIdMutation,
} from '@/services/airServices/tickets/single-ticket-details/tasks';
import { ARRAY_INDEX } from '@/constants/strings';
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
import { isoDateString } from '@/utils/dateTime';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptySelectedTicketTasksLists,
  setIsPortalClose,
} from '@/redux/slices/airServices/tickets-tasks/slice';
import { TICKET_TASKS_ACTIONS_CONSTANT } from '../Tasks.data';

const { EDIT_TICKET_TASKS } = TICKET_TASKS_ACTIONS_CONSTANT;

export const useUpsertTasks = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    (state) => state?.servicesTicketTasks?.isPortalOpen,
  );

  const selectedTicketTasksLists = useAppSelector(
    (state) => state?.servicesTicketTasks?.selectedTicketTasksLists,
  );

  const ticketId = router?.query?.ticketId;

  const [form, setForm] = useState<any>([]);

  const [postTicketTasksTrigger, postTicketTasksStatus] =
    usePostTaskByIdMutation();

  const [patchTicketTasksTrigger, patchTicketTasksStatus] =
    usePatchTaskByIdMutation();
  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();
  const [postAttachmentTrigger, postAttachmentStatus] =
    usePostDynamicFormAttachmentsMutation();

  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_SERVICES,
      moduleType: DYNAMIC_FIELDS?.MT_TASK,
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

  const methods = useForm({
    resolver: yupResolver(upsertTicketTaskFormValidationSchema?.(form)),
    defaultValues: upsertTicketTaskFormDefaultValues?.(
      selectedTicketTasksLists,
      form,
    ),
  });

  const { handleSubmit, reset, getValues } = methods;

  useEffect(() => {
    reset(() =>
      upsertTicketTaskFormDefaultValues(selectedTicketTasksLists, form),
    );
  }, [selectedTicketTasksLists, reset, form]);

  const submitUpsertTicketTasks = async (data: any) => {
    const filteredEmptyData = filteredEmptyValues(data);
    const { plannedEffort } = getValues();
    if (plannedEffort?.trim() !== '' && !/^\d+h\d+m$/?.test(plannedEffort)) {
      errorSnackbar(
        'Invalid format for Planned Effort. Please use format like 1h10m',
      );
      return;
    }

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
            value = isoDateString(value);
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

      const queryParams = {
        ...Object?.fromEntries(
          Object?.entries(filteredEmptyData)?.filter(
            ([key]) => !customFieldKeys?.has(key),
          ),
        ),
        ticketId: ticketId,
        startDate: isoDateString(filteredEmptyData?.startDate),
        endDate: isoDateString(filteredEmptyData?.endDate),
        assignTo: filteredEmptyData?.agent?._id,
        departmentId: filteredEmptyData?.department?._id,
        notifyBefore: filteredEmptyData?.notifyBefore?._id,
      };

      const reqBody = { customFields };

      delete queryParams?.department;
      delete queryParams?.agent;

      const apiDataParameter = {
        queryParams,
        reqBody,
      };

      if (isPortalOpen?.action === EDIT_TICKET_TASKS) {
        patchUpsertTicketTasks?.(apiDataParameter);
        return;
      }

      await postTicketTasksTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Task Created Successfully!');
      handleCloseDrawer?.();
    } catch (e: any) {
      errorSnackbar(e?.data?.message);
    }
  };

  const patchUpsertTicketTasks = async (formData: any) => {
    delete formData?.queryParams?.ticketId;

    const queryParams = {
      ...formData?.queryParams,
      id: selectedTicketTasksLists?.[ARRAY_INDEX?.ZERO]?._id,
    };
    const apiDataParameter = {
      queryParams,
      reqBody: formData?.reqBody,
    };

    try {
      await patchTicketTasksTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Task Updated Successfully!');
      handleCloseDrawer?.();
    } catch (error: any) {
      errorSnackbar(error?.error?.message);
    }
  };

  const handleCloseDrawer = () => {
    dispatch(emptySelectedTicketTasksLists());
    dispatch(setIsPortalClose());
    reset();
  };

  const upsertTicketTaskFormFormFields =
    upsertTicketTaskFormFormFieldsDynamic?.();

  return {
    submitUpsertTicketTasks,
    methods,
    handleCloseDrawer,
    handleSubmit,
    upsertTicketTaskFormFormFields,
    postTicketTasksStatus,
    patchTicketTasksStatus,
    getDynamicFieldsStatus,
    form,
    postAttachmentStatus,
    getDynamicFormData,
    isPortalOpen,
  };
};
