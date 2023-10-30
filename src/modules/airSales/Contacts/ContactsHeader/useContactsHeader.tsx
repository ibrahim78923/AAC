import { useState } from 'react';

const useContactsHeader = () => {
  const [isCreateDeal, setIsCreateDeal] = useState(false);

  const handleCreateDealOpen = () => setIsCreateDeal(!isCreateDeal);

  return {
    isCreateDeal,
    handleCreateDealOpen,
  };
};

export default useContactsHeader;
