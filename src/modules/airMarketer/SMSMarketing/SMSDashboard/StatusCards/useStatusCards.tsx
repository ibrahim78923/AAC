import { Theme, useTheme } from '@mui/material';

const useStatusCards = () => {
  const theme = useTheme<Theme>();
  return {
    theme,
  };
};

export default useStatusCards;
