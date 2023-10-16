import { Theme, useTheme } from '@mui/material';

const useNotification = () => {
  const theme = useTheme<Theme>();

  return {
    theme,
  };
};

export default useNotification;
