import { useTheme } from '@mui/material';

const useModuleCard = () => {
  const theme = useTheme();

  return {
    theme,
  };
};

export default useModuleCard;
