import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useTheme } from '@mui/material';
import { ChangeEvent } from 'react';
import { getActivityStatusMenuColors } from './ActivityStatusMenu.data';
import { IActivityStatusMenuProps } from './ActivityStatusMenu.interface';

export const useActivityStatusMenu = (props: IActivityStatusMenuProps) => {
  const {
    apiQuery = [undefined, { isLoading: false, originalArgs: {} }],
    successMessage = 'Status updated successfully!',
    activityStatus,
    patchParameterProps,
    refetchApi,
  } = props;

  const [trigger, statusQuery]: any = apiQuery;

  const theme: any = useTheme();
  const { backgroundColor, color, textColor } = getActivityStatusMenuColors(
    activityStatus,
    theme,
  );

  const handleStatusChange = async (
    info: any,
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    const patchParameter = patchParameterProps?.(event) || {
      queryParams: { id: info?._id },
      body: { status: event?.target?.value },
    };

    if (!trigger) return;

    try {
      await trigger(patchParameter)?.unwrap();
      successSnackbar(successMessage);
      await refetchApi?.();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };

  return { statusQuery, handleStatusChange, backgroundColor, color, textColor };
};
