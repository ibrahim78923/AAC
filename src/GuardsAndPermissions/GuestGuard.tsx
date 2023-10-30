import { useEffect, useState } from 'react';
// next
import { useRouter } from 'next/router';
// hooks
import useAuth from '../hooks/useAuth';
import { Box } from '@mui/material';
// routes

// ----------------------------------------------------------------------

export default function GuestGuard({ children }: any) {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const { isAuthenticated, isInitialized } = useAuth();

  useEffect(() => {
    if (!isInitialized) return;
    if (isAuthenticated) {
      push('/super-admin');
      return;
    }
    setIsLoading(false);
  }, [isAuthenticated, push, isInitialized]);

  if (!isInitialized || isLoading) {
    return <Box>Loading</Box>;
  }

  return <>{children}</>;
}
