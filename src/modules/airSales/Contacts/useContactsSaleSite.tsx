import { useState } from 'react';

import { useTheme } from '@mui/material';

const useContactsSaleSite = () => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [actions] = useState('actions');
  const [isOpen, setIsOpen] = useState(false);
  const [isDealCustomize, setIsDealCustomize] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isAssign, setIsAssign] = useState(false);
  const [isExport, setIsExport] = useState(false);

  const HandleDeleteModal = () => {
    setIsDelete(!isDelete);
  };
  const handleAssignModal = () => {
    setIsAssign(!isAssign);
  };

  const handleChange = () => setIsOpen(!isOpen);
  const handleDealCustomize = () => setIsDealCustomize(!isDealCustomize);

  const handleFilter = () => {
    setIsFilter(!isFilter);
  };
  const handleExportModal = () => {
    setIsExport(!isExport);
  };

  const handleActions = (value: string | any) => {
    switch (value) {
      case 'Re-assign':
        handleAssignModal();
        break;
      case 'Delete':
        HandleDeleteModal();
        break;
      case 'Export':
        handleExportModal();
        break;
      default:
        break;
    }
  };

  return {
    search,
    setSearch,
    actions,
    theme,
    isOpen,
    isDealCustomize,
    isFilter,
    isDelete,
    isAssign,
    isExport,
    handleChange,
    handleDealCustomize,
    handleFilter,
    handleActions,
    HandleDeleteModal,
    handleAssignModal,
    handleExportModal,
  };
};

export default useContactsSaleSite;
