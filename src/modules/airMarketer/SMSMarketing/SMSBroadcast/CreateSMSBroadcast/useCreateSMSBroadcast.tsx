import { Theme, useTheme } from '@mui/material';

const useCreateSMSBroadcast = () => {
  const theme = useTheme<Theme>();

  return {
    theme,
  };
};

export default useCreateSMSBroadcast;
