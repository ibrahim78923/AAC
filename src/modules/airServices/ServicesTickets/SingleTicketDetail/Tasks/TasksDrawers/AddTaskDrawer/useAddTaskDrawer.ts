import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  taskTicketFormDefaultValues,
  taskTicketFormValidationSchema,
} from '../TasksDrawersForm/TasksDrawersForm.data';
export const useAddTaskDrawer = () => {
  const methodsCreateNewTicketForm = useForm({
    resolver: yupResolver(taskTicketFormValidationSchema),
    defaultValues: taskTicketFormDefaultValues,
  });
  const submitCreateNewTicket = async () => {};
  const drawerSubmitHandler = () => {
    methodsCreateNewTicketForm?.handleSubmit(submitCreateNewTicket)();
  };
  return {
    methodsCreateNewTicketForm,
    submitCreateNewTicket,
    drawerSubmitHandler,
  };
};
