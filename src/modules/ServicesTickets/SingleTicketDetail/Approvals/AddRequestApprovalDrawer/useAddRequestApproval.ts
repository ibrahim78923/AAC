import {
  createTicketDefaultValues,
  createTicketValidationSchema,
} from '../../Tasks/CreateTicket/CreateTicket.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export function useAddRequestApprovalDrawer() {
  const methodsCreateNewTicketForm = useForm({
    resolver: yupResolver(createTicketValidationSchema),
    defaultValues: createTicketDefaultValues,
  });

  const onSubmit = () => {};
  return {
    methodsCreateNewTicketForm,
    createTicketValidationSchema,
    createTicketDefaultValues,
    onSubmit,
  };
}
