import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  singleTicketShareDefaultValues,
  singleTicketShareValidationSchema,
} from './ShareSingleTicket.data';
import { successSnackbar } from '@/utils/api';

export const useShareSingleTicket = (props: any) => {
  const { setOpenShareModal } = props;
  const methods: any = useForm<any>({
    resolver: yupResolver(singleTicketShareValidationSchema),
    defaultValues: singleTicketShareDefaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = () => {
    successSnackbar('Added 1 email(s) to the ticket');
    handleClose?.();
  };

  const handleClose = () => {
    setOpenShareModal(false);
    reset();
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    handleClose,
  };
};
