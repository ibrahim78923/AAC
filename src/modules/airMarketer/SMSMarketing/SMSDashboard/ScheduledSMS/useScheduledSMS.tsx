import { Theme, useTheme } from '@mui/material';

const useScheduledSMS = () => {
  const theme = useTheme<Theme>();

  const statusTag = (val: any) => {
    switch (val) {
      case 'Completed':
        return theme?.palette?.primary?.main;
      case 'Scheduled':
        return theme?.palette?.warning?.main;
      case 'Draft':
        return theme?.palette?.grey[900];
      case 'Processing':
        return theme?.palette?.success?.main;
    }
  };

  return {
    theme,
    statusTag,
  };
};

export default useScheduledSMS;
