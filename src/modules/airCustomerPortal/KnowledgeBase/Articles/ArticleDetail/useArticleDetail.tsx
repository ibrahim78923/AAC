import { useTheme } from '@mui/material';

export const useArticleDetail = () => {
  const theme = useTheme();
  return {
    theme,
  };
};
