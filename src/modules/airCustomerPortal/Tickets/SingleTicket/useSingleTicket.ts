import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

export const useSingleTicket = () => {
  const [status, setStatus] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const onSubmit = async () => {
    enqueueSnackbar('Added 1 email(s) to the ticket', {
      variant: 'success',
      autoHideDuration: 3000,
    });
    setStatus(true);
  };

  return {
    status,
    openPopup,
    setOpenPopup,
    onSubmit,
  };
};
