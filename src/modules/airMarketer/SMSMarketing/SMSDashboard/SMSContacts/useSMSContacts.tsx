import { Theme, useTheme } from '@mui/material';

const useSMSContacts = () => {
  const theme = useTheme<Theme>();
  return {
    theme,
  };
};

export default useSMSContacts;
