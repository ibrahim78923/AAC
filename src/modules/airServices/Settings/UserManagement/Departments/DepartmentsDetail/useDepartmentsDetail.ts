import { useTheme } from '@mui/material';

export const useDepartmentsDetail = () => {
  const theme = useTheme();
  return {
    theme,
  };
};
