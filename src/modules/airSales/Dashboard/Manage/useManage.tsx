import { useState } from 'react';

const useManage = () => {
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] = useState(false);

  return {
    isOpenFilterDrawer,
    setIsOpenFilterDrawer,
  };
};
export default useManage;
