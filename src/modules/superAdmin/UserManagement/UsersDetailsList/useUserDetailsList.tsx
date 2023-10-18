import { useState } from 'react';

const useUserDetailsList = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };
  return { handleCloseDrawer, isOpenDrawer, setIsOpenDrawer };
};
export default useUserDetailsList;
