import { useState } from 'react';

const useUserDetailsList = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isOpenAddCompanyDrawer, setISOpenCompanyDrawer] = useState(false);
  const [isOpenAdduserDrawer, setIsOpenAdduserDrawer] = useState(false);
  const [userStatus, setUserStatus] = useState('Active');
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };
  const handleCloseAddCompanyDrawer = () => {
    setISOpenCompanyDrawer(false);
  };
  const handleAddUserDrawer = () => {
    setIsOpenAdduserDrawer(false);
  };
  return {
    handleCloseDrawer,
    isOpenDrawer,
    setIsOpenDrawer,
    isOpenAddCompanyDrawer,
    setISOpenCompanyDrawer,
    handleCloseAddCompanyDrawer,
    handleAddUserDrawer,
    isOpenAdduserDrawer,
    setIsOpenAdduserDrawer,
    userStatus,
    setUserStatus,
  };
};
export default useUserDetailsList;
