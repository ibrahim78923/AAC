import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import useAuth from '../hooks/useAuth';
import LoadingScreen from '@/components/LoadingScreen';
import { ROLES } from '@/constants/strings';
import { SUPER_ADMIN, ORG_ADMIN, AUTH } from '@/constants';

// const array = [
//   {
//     email: 'mubashir.yusuf@ceative.co.uk',
//     path: '/super-admin',
//   },
//   {
//     email: 'azeem.aslam@ceative.co.uk',
//     path: '/air-sales/dashboard',
//   },

//   {
//     email: 'airmarketerapplecart@yopmail.com',
//     path: '/air-marketer/dashboard',
//   },
//   {
//     email: 'orgadminairapplecard@yopmail.com',
//     path: '/org-admin/dashboard',
//   },
// ];

export default function GuestGuard({ children }: any) {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const { isAuthenticated, isInitialized, user, logout }: any = useAuth();

  // const findSkillByEmail = ({ user, array }: any) => {
  //   return array.find((skill: any) => skill?.email === user?.email);
  // };
  // const path: any = findSkillByEmail({ user, array });

  let pathVariable: string;

  switch (user?.role) {
    case ROLES.ORG_EMPLOYEE:
      pathVariable = '/';
      break;
    case ROLES.ORG_ADMIN:
      pathVariable = ORG_ADMIN.DASHBOARD;
      break;
    case ROLES.SUPER_ADMIN:
      pathVariable = SUPER_ADMIN.DASHBOARD;
      break;
    default:
      pathVariable = AUTH.LOGIN;
      break;
  }

  useEffect(() => {
    if (!isInitialized) return;
    if (isAuthenticated) {
      push(pathVariable);
      if (pathVariable === AUTH.LOGIN) {
        logout();
      }
      return;
    }
    setIsLoading(false);
  }, [isAuthenticated, push, isInitialized]);

  if (!isInitialized || isLoading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
