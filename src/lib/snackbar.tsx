import { ARRAY_INDEX, NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';

export const errorSnackbar = (message?: any) => {
  const errorMessage = Array.isArray(message)
    ? message[ARRAY_INDEX.ZERO]
    : message ?? `Something went wrong`;

  enqueueSnackbar(errorMessage, {
    variant: NOTISTACK_VARIANTS?.ERROR,
  });
};

export const successSnackbar = (message: any = 'Success') => {
  enqueueSnackbar(message, {
    variant: NOTISTACK_VARIANTS?.SUCCESS,
  });
};

export const warningSnackbar = (message: any) => {
  enqueueSnackbar(message, {
    variant: NOTISTACK_VARIANTS?.WARNING,
  });
};
