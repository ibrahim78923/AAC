import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';

const useModuleForms = () => {
  const theme = useTheme();
  const router = useRouter();

  return {
    theme,
    router,
  };
};

export default useModuleForms;
