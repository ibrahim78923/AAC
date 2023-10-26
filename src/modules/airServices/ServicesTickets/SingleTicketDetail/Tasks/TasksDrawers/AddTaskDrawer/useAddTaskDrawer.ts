import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  TaskTicketFormDefaultValues,
  TaskTicketFormValidationSchema,
} from '../TasksDrawersForm/TasksForm.data';
export const useAddTaskDrawer = () => {
  const methodsCreateNewTicketForm = useForm({
    resolver: yupResolver(TaskTicketFormValidationSchema),
    defaultValues: TaskTicketFormDefaultValues,
  });
  const submitCreateNewTicket = async () => {};
  const drawerSubmitHandler = () => {
    methodsCreateNewTicketForm.handleSubmit(submitCreateNewTicket)();
  };
  return {
    methodsCreateNewTicketForm,
    submitCreateNewTicket,
    drawerSubmitHandler,
  };
};
