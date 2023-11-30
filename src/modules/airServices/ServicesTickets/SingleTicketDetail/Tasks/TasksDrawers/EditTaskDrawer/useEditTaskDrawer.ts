import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  taskTicketFormDefaultValues,
  taskTicketFormValidationSchema,
} from '../TasksDrawersForm/TasksDrawersForm.data';

export const useEditTaskDrawer = () => {
  const methodsEditTicketForm = useForm({
    resolver: yupResolver(taskTicketFormValidationSchema),
    defaultValues: taskTicketFormDefaultValues,
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
