import { useState } from 'react';

const useStepDeal = () => {
  const [isCreateDealDrawerOpen, setIsCreateDealDrawerOpen] = useState(false);

  const handleOpneCreateDealDrawer = () => {
    setIsCreateDealDrawerOpen(true);
  };
  const handleCloseCreateDealDrawer = () => {
    setIsCreateDealDrawerOpen(false);
  };

  return {
    isCreateDealDrawerOpen,
    handleOpneCreateDealDrawer,
    handleCloseCreateDealDrawer,
  };
};

export default useStepDeal;
