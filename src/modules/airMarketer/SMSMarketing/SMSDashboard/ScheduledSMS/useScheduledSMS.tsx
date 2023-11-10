import { Theme, useTheme } from '@mui/material';

const useScheduledSMS = () => {
  const theme = useTheme<Theme>();
  return {
    theme,
  };
};

export default useScheduledSMS;
