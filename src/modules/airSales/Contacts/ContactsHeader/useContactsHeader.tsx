import { useState } from 'react';

const useContactsHeader = () => {
  const [isCreateDeal, setIsCreateDeal] = useState(false);
  const [isImportDeal, setIsImportDeal] = useState(false);
  const [IsViewAll, setIsViewAll] = useState(false);

  const handleCreateDealOpen = () => setIsCreateDeal(!isCreateDeal);
  const handleImportDealOpen = () => setIsImportDeal(!isImportDeal);
  const handleViewAll = () => {
    setIsViewAll(!IsViewAll);
  };

  return {
    IsViewAll,
    isImportDeal,
    isCreateDeal,
    handleCreateDealOpen,
    handleImportDealOpen,
    handleViewAll,
  };
};

export default useContactsHeader;
