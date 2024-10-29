import { useGetDelegateDashboardDataQuery } from '@/services/orgAdmin/Delegates';
import { Theme, useTheme } from '@mui/material';
import { useState } from 'react';

const useDelegates = () => {
  const theme: any = useTheme<Theme>();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const { data: getDelegateData, isLoading: getDelgateDataLoading } =
    useGetDelegateDashboardDataQuery({});

  return {
    theme,
    isInviteModalOpen,
    setIsInviteModalOpen,
    getDelegateData,
    getDelgateDataLoading,
  };
};

export default useDelegates;
