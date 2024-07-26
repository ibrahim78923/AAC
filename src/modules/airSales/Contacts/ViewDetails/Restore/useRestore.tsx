import { useState } from 'react';

import { useTheme } from '@mui/material';

const useRestore = () => {
  const theme = useTheme();
  const [isRestoreFilter, setIsRestoreFilter] = useState(false);
  const [search, setSearch] = useState('');
  const [isPermanantlyDel, setIsPermanantlyDel] = useState(false);
  const [IsRestoreDealModal, setIsRestoreDealModal] = useState(false);

  const handlePermanantDelete = () => {
    setIsPermanantlyDel(!isPermanantlyDel);
  };
  const handleResDealModal = () => {
    setIsRestoreDealModal(!IsRestoreDealModal);
  };

  const handleRestoreFilter = () => {
    setIsRestoreFilter(!isRestoreFilter);
  };
  const handleActions = (value: string | any) => {
    switch (value) {
      case 'Restore':
        handleResDealModal();
        break;
      case 'Delete':
        handlePermanantDelete();
        break;
      default:
        break;
    }
  };
  return {
    isRestoreFilter,
    handleRestoreFilter,
    search,
    setSearch,
    handlePermanantDelete,
    handleResDealModal,
    isPermanantlyDel,
    IsRestoreDealModal,
    theme,
    handleActions,
  };
};

export default useRestore;
