import { useTheme } from '@mui/material';

const useAnalyze = () => {
  const theme = useTheme();

  return {
    theme,
  };
};

export default useAnalyze;
