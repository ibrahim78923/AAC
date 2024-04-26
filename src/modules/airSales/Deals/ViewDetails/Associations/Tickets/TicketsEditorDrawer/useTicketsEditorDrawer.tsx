import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ticketsDefaultValues,
  ticketsValidationSchema,
} from './TicketsEditorDrawer.data';

const useTicketsEditorDrawer = () => {
  const [searchTicket, setSearchTicket] = useState('');
  const methodsTickets = useForm({
    resolver: yupResolver(ticketsValidationSchema),
    defaultValues: ticketsDefaultValues,
  });

  const { handleSubmit, watch } = methodsTickets;
  const watchTickets = watch(['ticketStatus']);

  const onSubmit = () => {};

  return {
    handleSubmit,
    onSubmit,
    methodsTickets,
    watchTickets,
    setSearchTicket,
    searchTicket,
  };
};

export default useTicketsEditorDrawer;
