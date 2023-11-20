import { useState } from 'react';

const useManage = () => {
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] = useState(false);
  const [searchByName, setSearchByName] = useState('');

  return {
    isOpenFilterDrawer,
    setIsOpenFilterDrawer,
    searchByName,
    setSearchByName,
  };
};
export default useManage;
