import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import {
  singleTicketPopupValidationSchema,
  singleTicketPopupDefaultValues,
} from './SingleTicketPopup.data';

export const useSingleTicketPopup = (props: any) => {
  const { setOpenPopup } = props;
  const methods: any = useForm({
    resolver: yupResolver(singleTicketPopupValidationSchema),
    defaultValues: singleTicketPopupDefaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('Added 1 email(s) to the ticket', {
      variant: 'success',
      autoHideDuration: 3000,
    });
    setOpenPopup(false);
    reset(singleTicketPopupDefaultValues);
  };
  return {
    methods,
    handleSubmit,
    onSubmit,
  };
};
