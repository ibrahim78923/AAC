import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  taskTicketFormDefaultValues,
  taskTicketFormValidationSchema,
} from '../TasksDrawersForm/TasksDrawersForm.data';
import { useEffect } from 'react';
import {
  useLazyGetAgentsDropdownListQuery,
  useLazyGetDepartmentDropdownListQuery,
  usePatchTaskByIdMutation,
} from '@/services/airServices/tickets/single-ticket-details/tasks';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useEditTaskDrawer = (props: any) => {
  const { activeCheck, isDrawerOpen, onClose, setActiveCheck } = props;
  const methodsEditTicketForm = useForm({
    resolver: yupResolver(taskTicketFormValidationSchema),
    defaultValues: taskTicketFormDefaultValues(activeCheck),
  });
  const [patchMutation] = usePatchTaskByIdMutation();
  const submitEditTicket = async (data: any) => {
    const editData = {
      data: {
        ...data,
        startDate: data?.startDate?.toISOString(),
        endDate: data?.endDate?.toISOString(),
        assignTo: data?.assignTo?._id,
        departmentId: data?.departmentId?._id,
      },
      id: activeCheck?.[0]?._id,
    };
    try {
      const res: any = await patchMutation(editData)?.unwrap();
      enqueueSnackbar(res?.message ?? 'Task updated successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setActiveCheck([]);
      onClose(false);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.error ?? 'An error', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  useEffect(() => {
    methodsEditTicketForm?.reset(taskTicketFormDefaultValues(activeCheck));
  }, [isDrawerOpen]);
  const drawerSubmitHandler = () => {
    methodsEditTicketForm?.handleSubmit(submitEditTicket)();
  };
  const departmentDropdown = useLazyGetDepartmentDropdownListQuery();
  const userDropdown = useLazyGetAgentsDropdownListQuery();
  return {
    methodsEditTicketForm,
    drawerSubmitHandler,
    departmentDropdown,
    userDropdown,
  };
};
