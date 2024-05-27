import { useState } from 'react';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';

export function useHeaderDashboard() {
  const theme = useTheme();
  const router = useRouter();

  const { user }: any = useAuth();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const emailToCopy = 'air.applecart@yop.com';

  const copyEmail = () => {
    navigator?.clipboard?.writeText(emailToCopy);
  };

  return {
    theme,
    router,
    isDrawerOpen,
    setIsDrawerOpen,
    user,
    copyEmail,
  };
}
