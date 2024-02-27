import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useGetCompanyDealsQuery } from '@/services/commonFeatures/companies';

const useDeals = (companyId: any) => {
  const theme = useTheme();
  const [searchName, setSearchName] = useState('');
  const [openDrawer, setOpenDrawer] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };
  const { data: getCompanyDeals } = useGetCompanyDealsQuery({
    id: companyId.companyId,
  });

  return {
    theme,
    isOpenAlert,
    setIsOpenAlert,
    searchName,
    setSearchName,
    openDrawer,
    setOpenDrawer,
    handleCloseAlert,
    getCompanyDeals,
  };
};

export default useDeals;
