import { Theme, useTheme } from '@mui/material';

const useContacts = () => {
  const theme = useTheme<Theme>();
  return {
    theme,
  };
};

export default useContacts;
