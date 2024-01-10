import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  taskTicketFormDefaultValues,
  taskTicketFormValidationSchema,
} from '../TasksDrawersForm/TasksDrawersForm.data';
import {
  useLazyGetAgentsDropdownListQuery,
  useLazyGetDepartmentDropdownListQuery,
  usePostTaskByIdMutation,
} from '@/services/airServices/tickets/single-ticket-details/tasks';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useSearchParams } from 'next/navigation';
export const useAddTaskDrawer = (props: any) => {
  const { onClose } = props;
  const methodsCreateNewTicketForm = useForm({
    resolver: yupResolver(taskTicketFormValidationSchema),
    defaultValues: taskTicketFormDefaultValues(null),
  });
  const searchParams = useSearchParams();
  const taskId = searchParams?.get('ticketId');
  const [postTask] = usePostTaskByIdMutation();
  const submitCreateNewTicket = async (data: any) => {
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
      const res = await postTask(params)?.unwrap();
      enqueueSnackbar(res?.message ?? 'Task add successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      methodsCreateNewTicketForm?.reset();
      onClose(false);
    } catch (error: any) {
      enqueueSnackbar(error?.error?.message ?? 'An error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const drawerSubmitHandler = () => {
    methodsCreateNewTicketForm?.handleSubmit(submitCreateNewTicket)();
  };
  const departmentDropdown = useLazyGetDepartmentDropdownListQuery();
  const userDropdown = useLazyGetAgentsDropdownListQuery();
  return {
    methodsCreateNewTicketForm,
    drawerSubmitHandler,
    departmentDropdown,
    userDropdown,
  };
};
