import { useState } from 'react';
import { columnsCallInQueue } from './CallsInQueue.data';

export const useCallINQueue = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [multiSelect, setMultiSelect] = useState<null | HTMLElement>(null);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);
  const actionMenuOpen = Boolean(anchorEl);
  const [startPowerDialerModal, setStartPowerDialerModal] = useState(false);
  const handleActionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseMultiSelect = () => {
    setMultiSelect(null);
  };

  const getColumns = columnsCallInQueue({ setStartPowerDialerModal });
  return {
    searchTerm,
    setSearchTerm,
    handleActionsClick,
    handleClose,
    handleCloseMultiSelect,
    actionMenuOpen,
    anchorEl,
    setAnchorEl,
    getColumns,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    multiSelect,
    startPowerDialerModal,
    setStartPowerDialerModal,
  };
};
