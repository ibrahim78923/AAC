import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  TaskTicketFormDefaultValues,
  TaskTicketFormValidationSchema,
} from '../TasksDrawersForm/TasksDrawersForm.data';

export const useEditTaskDrawer = () => {
  const methodsEditTicketForm = useForm({
    resolver: yupResolver(TaskTicketFormValidationSchema),
    defaultValues: TaskTicketFormDefaultValues,
  });
  const submitEditTicket = async () => {};
  const drawerSubmitHandler = () => {
    methodsEditTicketForm?.handleSubmit(submitEditTicket)();
  };
  return {
    methodsEditTicketForm,
    submitEditTicket,
    drawerSubmitHandler,
  };
};
