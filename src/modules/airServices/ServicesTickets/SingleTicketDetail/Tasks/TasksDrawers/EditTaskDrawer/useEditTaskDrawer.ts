import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  taskTicketFormDefaultValues,
  taskTicketFormValidationSchema,
} from '../TasksDrawersForm/TasksDrawersForm.data';
import { useEffect } from 'react';
import {
  useLazyGetUsersDropdownListQuery,
  useLazyGetDepartmentDropdownListQuery,
  usePatchTaskByIdMutation,
} from '@/services/airServices/tickets/single-ticket-details/tasks';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useEditTaskDrawer = (props: any) => {
  const { activeCheck, isDrawerOpen, onClose, setActiveCheck } = props;
  const methodsEditTicketForm = useForm({
    resolver: yupResolver(taskTicketFormValidationSchema),
    defaultValues: taskTicketFormDefaultValues(activeCheck),
  });
  const [patchMutation, { isLoading }] = usePatchTaskByIdMutation();

  const submitEditTicket = async (data: any) => {
    const { plannedEffort } = methodsEditTicketForm?.getValues();
    if (plannedEffort?.trim() !== '' && !/^\d+h\d+m$/?.test(plannedEffort)) {
      errorSnackbar(
        'Invalid format for Planned Effort. Please use format like 1h10m',
      );
      return;
    }

    const editData = {
      data: {
        ...data,
        startDate: data?.startDate?.toISOString(),
        endDate: data?.endDate?.toISOString(),
        assignTo: data?.assignTo?._id,
        departmentId: data?.departmentId?._id,
        notifyBefore: data?.notifyBefore?.value,
        id: activeCheck?.[0]?._id,
      },
    };
    try {
      await patchMutation(editData)?.unwrap();
      successSnackbar('Task Updated Successfully!');
      setActiveCheck([]);
      onClose(false);
    } catch (error: any) {
      errorSnackbar(error?.error?.message);
    }
  };
  useEffect(() => {
    methodsEditTicketForm?.reset(taskTicketFormDefaultValues(activeCheck));
  }, [isDrawerOpen]);
  const drawerSubmitHandler = () => {
    methodsEditTicketForm?.handleSubmit(submitEditTicket)();
  };
  const departmentDropdown = useLazyGetDepartmentDropdownListQuery();
  const userDropdown = useLazyGetUsersDropdownListQuery();
  return {
    methodsEditTicketForm,
    drawerSubmitHandler,
    departmentDropdown,
    userDropdown,
    isLoading,
  };
};
