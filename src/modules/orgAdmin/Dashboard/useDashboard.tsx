import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useGetUsersByIdQuery } from '@/services/superAdmin/user-management/users';
import { getSession } from '@/utils';

const useDashboard = () => {
  const theme = useTheme();
  const [tabVal, setTabVal] = useState(0);

  const { user }: any = getSession();
  const { data: getUserData, isLoading: profileDataLoading } =
    useGetUsersByIdQuery(user?._id);

  return {
    theme,
    tabVal,
    setTabVal,
    getUserData,
    profileDataLoading,
  };
};

export default useDashboard;
