import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

export const useSingleTicket = () => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    status &&
      enqueueSnackbar('Your ticket has been close', {
        variant: 'success',
        autoHideDuration: 3000,
      });
  }, [status]);

  return {
    status,
    setStatus,
  };
};
