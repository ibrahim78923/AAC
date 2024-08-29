import { Permissions } from '@/constants/permissions';
import { FEEDBACK_SURVEY_PATH_TYPES } from '@/constants/strings';
import useAuth from '@/hooks/useAuth';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useFeedbackSurvey = () => {
  const theme: any = useTheme();
  const router: any = useRouter();
  const { currentPermissions } = useAuth();
  const checkPermissions = (
    currentPermissions: any,
    modulePermissions: any,
  ) => {
    const permissionsDictionary: any = {};
    modulePermissions?.forEach((permission: any) => {
      permissionsDictionary[permission] = true;
    });

    return (
      currentPermissions?.some(
        (permission: any) => permissionsDictionary?.[permission],
      ) || false
    );
  };
  const supportPermissions = checkPermissions(
    currentPermissions,
    Permissions?.AIR_SERVICES_CUSTOMER_SUPPORT_FEEDBACK_SURVEY,
  );
  const satisfactionPermissions = checkPermissions(
    currentPermissions,
    Permissions?.AIR_SERVICES_CUSTOMER_SATISFACTION_FEEDBACK_SURVEY,
  );
  const routerQuery =
    (supportPermissions && satisfactionPermissions) || supportPermissions
      ? FEEDBACK_SURVEY_PATH_TYPES?.CUSTOMER_SUPPORT
      : FEEDBACK_SURVEY_PATH_TYPES?.CUSTOMER_SATISFACTION;
  useEffect(() => {
    if (!router?.query?.type) {
      router?.push({
        pathname: router?.basePath,
        query: { type: routerQuery },
      });
    }
  }, [!router?.query?.type]);
  const handleClick = (query: string) => {
    router?.push({
      pathname: router?.basePath,
      query: { type: query },
    });
  };
  return {
    handleClick,
    theme,
    router,
    supportPermissions,
    satisfactionPermissions,
  };
};
