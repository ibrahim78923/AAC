import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import useAuth from '../hooks/useAuth';
import LoadingScreen from '@/components/LoadingScreen';

const array = [
  {
    email: 'mubashir.yusuf@ceative.co.uk',
    path: '/super-admin',
  },
  {
    email: 'azeem.aslam@ceative.co.uk',
    path: '/air-sales/dashboard',
  },

  {
    email: 'airmarketerapplecart@yopmail.com',
    path: '/air-marketer/dashboard',
  },
  {
    email: 'orgadminairapplecard@yopmail.com',
    path: '/org-admin/dashboard',
  },
];

export default function GuestGuard({ children }: any) {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const { isAuthenticated, isInitialized, user } = useAuth();
  const findSkillByEmail = ({ user, array }: any) => {
    return array.find((skill: any) => skill?.email === user?.email);
  };

  const path: any = findSkillByEmail({ user, array });

  useEffect(() => {
    if (!isInitialized) return;
    if (isAuthenticated) {
      push(path?.path);
      return;
    }
    setIsLoading(false);
  }, [isAuthenticated, push, isInitialized]);

  if (!isInitialized || isLoading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
