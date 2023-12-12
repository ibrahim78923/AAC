import { useTheme } from '@mui/material';

const useEmailMarketing = () => {
  const theme = useTheme();
  return {
    theme,
  };
};
export default useEmailMarketing;
