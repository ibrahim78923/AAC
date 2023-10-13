import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  ticketsDefaultValues,
  ticketsValidationSchema,
} from './TicketsEditorDrawer.data';

const useTicketsEditorDrawer = () => {
  const methodsTickets = useForm({
    resolver: yupResolver(ticketsValidationSchema),
    defaultValues: ticketsDefaultValues,
  });

  const onSubmit = () => {};
  const { handleSubmit } = methodsTickets;
  return { handleSubmit, onSubmit, methodsTickets };
};

export default useTicketsEditorDrawer;
