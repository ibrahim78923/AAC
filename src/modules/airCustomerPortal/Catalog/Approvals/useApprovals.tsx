import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
export const useApprovals = () => {
  const router = useRouter();
  const { palette }: any = useTheme();
  const theme = useTheme();
  return { router, theme, palette };
};
