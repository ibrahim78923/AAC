import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { data } from './ReceivedItems.data';

export const useReceivedItems = (props: any) => {
  let booVariable: boolean;
  const [errorOccurred, setErrorOccurred] = useState(false);
  const { isDrawerOpen, setIsDrawerOpen } = props;
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
    data?.forEach((item) => {
      if (item?.Id === item?.Id && item?.received < item?.pending) {
        booVariable = true;
      } else {
        setErrorOccurred(true);
      }
    });
    setIsDrawerOpen(false);
    showSnackbar(booVariable);
  };

  return {
    errorOccurred,
    submitHandler,
    isDrawerOpen,
    setIsDrawerOpen,
  };
};
