import { useState } from 'react';

import { useRouter } from 'next/router';

import { useTheme } from '@mui/material';

const useDealSaleSite = () => {
  const router = useRouter();
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [actions, setActions] = useState('actions');
  const [isOpen, setIsOpen] = useState(false);
  const [isDealCustomize, setIsDealCustomize] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [isShareDine, setIsShareDine] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isAssign, setIsAssign] = useState(false);
  const [exportRecord, setExportRecord] = useState(false);
  const [listView, SetListView] = useState('listView');

  const handleListViewClick = (val: string) => {
    SetListView(val);
  };
  const HandleDeleteModal = () => {
    setIsDelete(!isDelete);
  };
  const handleAssignModal = () => {
    setIsAssign(!isAssign);
  };

  const handleChange = () => setIsOpen(!isOpen);

  const handleDealCustomize = () => setIsDealCustomize(!isDealCustomize);

  const handleSMD = () => {
    setIsShareDine(!isShareDine);
  };
  const handleFilter = () => {
    setIsFilter(!isFilter);
  };
  const handleExportRecord = () => {
    setExportRecord(!exportRecord);
  };

  const handleActions = (value: string | any) => {
    switch (value) {
      case 'Preview':
        handleSMD();
        break;
      case 'Re-assign':
        handleAssignModal();
        break;
      case 'Delete':
        HandleDeleteModal();
        break;
      case 'Export':
        handleExportRecord();
        break;
      case 'View Details':
        router.push({ pathname: '/air-sales/deals/view-details' });
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
    handleChange,
    handleDealCustomize,
    handleSMD,
    handleFilter,
    handleActions,
    HandleDeleteModal,
    handleAssignModal,
    isDelete,
    isAssign,
    exportRecord,
    handleExportRecord,
    listView,
    handleListViewClick,
  };
};

export default useDealSaleSite;
