import { useState } from 'react';

import { useTheme } from '@mui/material';

const useDealSaleSite = () => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [actions, setActions] = useState('actions');
  const [isOpen, setIsOpen] = useState(false);
  const [isDealCustomize, setIsDealCustomize] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [isShareDine, setIsShareDine] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const handleChange = () => setIsOpen(!isOpen);
  const handleDealCustomize = () => setIsDealCustomize(!isDealCustomize);

  const handleSMD = () => {
    setIsShareDine(!isShareDine);
  };
  const handleFilter = () => {
    setIsFilter(!isFilter);
  };
  const HandleDeleteModal = () => {
    setIsDelete(!isDelete);
  };
  const handleActions = (e: any) => {
    const { value } = e.target;
    switch (value) {
      case 'Preview':
        handleSMD();
        break;
      case 'Delete':
        HandleDeleteModal();
        break;

      default:
        break;
    }
  };

  return {
    search,
    setSearch,
    actions,
    setActions,
    theme,
    isOpen,
    isDealCustomize,
    isFilter,
    isShareDine,
    isDelete,
    handleChange,
    handleDealCustomize,
    handleSMD,
    handleFilter,
    handleActions,
    HandleDeleteModal,
  };
};

export default useDealSaleSite;
