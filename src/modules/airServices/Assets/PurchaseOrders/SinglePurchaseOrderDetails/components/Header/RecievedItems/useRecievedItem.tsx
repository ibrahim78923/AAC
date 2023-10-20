import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { data } from './RecievdItemTable.data';
export default function useRecievedItem() {
  let booVariable: boolean;
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const showSnackbar = (boolValue: boolean) => {
    if (boolValue) {
      const message = 'Purchase Order items count update successfully';
      const variant = 'success';
      enqueueSnackbar(message, {
        variant: variant,
      });
      setIsDrawerOpen(false);
    }
  };
  const submitHandler = () => {
    data.forEach((item) => {
      if (item.Id === item.Id && item.received < item.pending) {
        booVariable = true;
      } else {
        setErrorOccurred(true);
      }
    });
    showSnackbar(booVariable);
  };

  return {
    errorOccurred,
    submitHandler,
    isDrawerOpen,
    setIsDrawerOpen,
  };
}
