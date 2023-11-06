import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

export const useSingleTicket = () => {
  const [status, setStatus] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const onSubmit = async () => {
    enqueueSnackbar('The ticket has been closed', {
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
