import {
  upsertTicketTaskFormDefaultValues,
  upsertTicketTaskFormFormFieldsDynamic,
  upsertTicketTaskFormValidationSchema,
} from './UpsertTasks.data';
import { filteredEmptyValues } from '@/utils/api';
import { useRouter } from 'next/router';
import { ARRAY_INDEX } from '@/constants/strings';
import { useEffect } from 'react';
import { DYNAMIC_FIELDS } from '@/utils/dynamic-forms';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptySelectedTicketTasksLists,
  setIsPortalClose,
} from '@/redux/slices/airServices/tickets-tasks/slice';
import { TICKET_TASKS_ACTIONS_CONSTANT } from '../Tasks.data';
import {
  useAddSingleServicesTasksByIdMutation,
  useUpdateSingleServicesTasksByIdMutation,
} from '@/services/airServices/tickets/single-ticket-details/tasks';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { isoDateString } from '@/lib/date-time';
import { REGEX } from '@/constants/validation';
import { useFormLib } from '@/hooks/useFormLib';
import { useDynamicForm } from '@/components/DynamicForm/useDynamicForm';

const { EDIT_TICKET_TASKS } = TICKET_TASKS_ACTIONS_CONSTANT;

export const useUpsertTasks = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    (state) => state?.servicesTicketTasks?.isPortalOpen,
  );

  const selectedTicketTasksLists: any = useAppSelector(
    (state) => state?.servicesTicketTasks?.selectedTicketTasksLists,
  );

  const ticketId = router?.query?.ticketId;

  const [postTicketTasksTrigger, postTicketTasksStatus] =
    useAddSingleServicesTasksByIdMutation();

  const [patchTicketTasksTrigger, patchTicketTasksStatus] =
    useUpdateSingleServicesTasksByIdMutation();

  const dynamicFormProps = {
    productType: DYNAMIC_FIELDS?.PT_SERVICES,
    moduleType: DYNAMIC_FIELDS?.MT_TASK,
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

  const formLibProps = {
    validationSchema: upsertTicketTaskFormValidationSchema?.(form),
    defaultValues: upsertTicketTaskFormDefaultValues?.(
      selectedTicketTasksLists,
      form,
    ),
  };

  const { handleSubmit, reset, getValues, setError, setValue, watch, methods } =
    useFormLib(formLibProps);

  useEffect(() => {
    reset(() =>
      upsertTicketTaskFormDefaultValues(selectedTicketTasksLists, form),
    );
  }, [selectedTicketTasksLists, reset, form]);

  const submitUpsertTicketTasks = async (data: any) => {
    const filteredEmptyData = filteredEmptyValues(data);
    const { plannedEffort } = getValues();
    if (
      plannedEffort?.trim() !== '' &&
      !REGEX?.HOURS_AND_MINUTES?.test(plannedEffort)
    ) {
      setError('plannedEffort', {
        message:
          'Invalid format for planned effort. Please use format like 1h10m',
      });
      return;
    }

    try {
      const { customFieldKeys, customFields }: any =
        await handleUploadAttachments?.(data, filteredEmptyData);

      const queryParams: any = {
        ...Object?.fromEntries(
          Object?.entries(filteredEmptyData)?.filter(
            ([key]) => !customFieldKeys?.has(key),
          ),
        ),
        ticketId: ticketId,
        startDate: !!filteredEmptyData?.startDate
          ? isoDateString(filteredEmptyData?.startDate)
          : undefined,
        endDate: !!filteredEmptyData?.endDate
          ? isoDateString(filteredEmptyData?.endDate)
          : undefined,
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
      successSnackbar('Task created successfully!');
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
      successSnackbar('Task updated successfully!');
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
    upsertTicketTaskFormFormFieldsDynamic?.(getValues, setValue, watch);

  const apiCallInProgress =
    postTicketTasksStatus?.isLoading ||
    patchTicketTasksStatus?.isLoading ||
    attachmentsApiCallInProgress;

  const showLoader = isDynamicFormLoading;

  const hasError = hasDynamicFormError;

  return {
    submitUpsertTicketTasks,
    methods,
    handleCloseDrawer,
    handleSubmit,
    upsertTicketTaskFormFormFields,
    form,
    getDynamicFormData,
    isPortalOpen,
    apiCallInProgress,
    showLoader,
    hasError,
  };
};
