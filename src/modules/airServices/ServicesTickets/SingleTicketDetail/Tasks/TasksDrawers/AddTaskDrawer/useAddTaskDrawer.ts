import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  taskTicketFormDefaultValues,
  taskTicketFormValidationSchema,
} from '../TasksDrawersForm/TasksDrawersForm.data';
import {
  useLazyGetUsersDropdownListQuery,
  useLazyGetDepartmentDropdownListQuery,
  usePostTaskByIdMutation,
} from '@/services/airServices/tickets/single-ticket-details/tasks';
import { useSearchParams } from 'next/navigation';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useAddTaskDrawer = (props: any) => {
  const { onClose } = props;
  const methodsCreateNewTicketForm = useForm({
    resolver: yupResolver(taskTicketFormValidationSchema),
    defaultValues: taskTicketFormDefaultValues(null),
  });

  const searchParams = useSearchParams();
  const taskId = searchParams?.get('ticketId');
  const [postTask, { isLoading }] = usePostTaskByIdMutation();

  const submitCreateNewTicket = async (data: any) => {
    const { plannedEffort } = methodsCreateNewTicketForm?.getValues();
    if (plannedEffort?.trim() !== '' && !/^\d+h\d+m$/?.test(plannedEffort)) {
      errorSnackbar(
        'Invalid format for Planned Effort. Please use format like 1h10m',
      );
      return;
    }

    const params = {
      ...data,
      ticketId: taskId,
      startDate: data?.startDate?.toISOString(),
      endDate: data?.endDate?.toISOString(),
      assignTo: data?.assignTo?._id,
      departmentId: data?.departmentId?._id,
      notifyBefore: data?.notifyBefore?.value,
    };
    try {
      await postTask(params)?.unwrap();
      successSnackbar('Task Created Successfully!');
      methodsCreateNewTicketForm?.reset();
      onClose(false);
    } catch (error: any) {
      errorSnackbar(error?.error?.message);
    }
  };
  const drawerSubmitHandler = () => {
    methodsCreateNewTicketForm?.handleSubmit(submitCreateNewTicket)();
  };
  const handleClose = () => {
    onClose(false);
    methodsCreateNewTicketForm?.reset();
  };
  const departmentDropdown = useLazyGetDepartmentDropdownListQuery();
  const userDropdown = useLazyGetUsersDropdownListQuery();
  return {
    methodsCreateNewTicketForm,
    drawerSubmitHandler,
    departmentDropdown,
    userDropdown,
    handleClose,
    isLoading,
  };
};
