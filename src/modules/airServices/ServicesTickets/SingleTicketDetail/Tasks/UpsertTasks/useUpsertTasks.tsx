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
  useLazyGetDepartmentDropdownListForTicketTasksQuery,
  useLazyGetUsersDropdownListForTicketTasksQuery,
  usePatchTaskByIdMutation,
  usePostTaskByIdMutation,
} from '@/services/airServices/tickets/single-ticket-details/tasks';
import { ARRAY_INDEX } from '@/constants/strings';

export const useUpsertTasks = (props: any) => {
  const {
    setIsPortalOpen,
    selectedTasksList,
    setSelectedTasksLists,
    isPortalOpen,
  } = props;
  const router = useRouter();

  const { ticketId } = router?.query;

  const [postTicketTasksTrigger, postTicketTasksStatus] =
    usePostTaskByIdMutation();

  const [patchTicketTasksTrigger, patchTicketTasksStatus] =
    usePatchTaskByIdMutation();

  const methods = useForm({
    resolver: yupResolver(upsertTicketTaskFormValidationSchema),
    defaultValues: upsertTicketTaskFormDefaultValues(selectedTasksList),
  });

  const { handleSubmit, reset, getValues } = methods;

  const submitUpsertTicketTasks = async (formData: any) => {
    const newFormData = filteredEmptyValues(formData);
    const { plannedEffort } = getValues();
    if (plannedEffort?.trim() !== '' && !/^\d+h\d+m$/?.test(plannedEffort)) {
      errorSnackbar(
        'Invalid format for Planned Effort. Please use format like 1h10m',
      );
      return;
    }

    const queryParams = {
      ...newFormData,
      ticketId: ticketId,
      startDate: newFormData?.startDate?.toISOString(),
      endDate: newFormData?.endDate?.toISOString(),
      assignTo: newFormData?.assignTo?._id,
      departmentId: newFormData?.departmentId?._id,
      notifyBefore: newFormData?.notifyBefore?._id,
    };

    const apiDataParameter = {
      queryParams,
    };

    if (isPortalOpen?.isEdit) {
      patchUpsertTicketTasks?.(queryParams);
      return;
    }
    try {
      await postTicketTasksTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Task Created Successfully!');
      handleCloseDrawer?.();
    } catch (error: any) {
      errorSnackbar(error?.error?.message);
    }
  };
  const patchUpsertTicketTasks = async (formData: any) => {
    delete formData?.ticketId;
    const queryParams = {
      ...formData,
      id: selectedTasksList?.[ARRAY_INDEX?.ZERO]?._id,
    };
    const apiDataParameter = {
      queryParams,
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
    setIsPortalOpen({});
    setSelectedTasksLists?.([]);
    reset();
  };

  const apiQueryDepartment =
    useLazyGetDepartmentDropdownListForTicketTasksQuery();
  const apiQueryUser = useLazyGetUsersDropdownListForTicketTasksQuery();
  const upsertTicketTaskFormFormFields =
    upsertTicketTaskFormFormFieldsDynamic?.(apiQueryDepartment, apiQueryUser);

  return {
    submitUpsertTicketTasks,
    methods,
    handleCloseDrawer,
    handleSubmit,
    upsertTicketTaskFormFormFields,
    postTicketTasksStatus,
    patchTicketTasksStatus,
  };
};
