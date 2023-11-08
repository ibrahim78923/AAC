import React, { useState } from 'react';

import { Theme, useTheme } from '@mui/material';

import useToggle from '@/hooks/useToggle';

const useCompanies = () => {
  const theme = useTheme<Theme>();
  const [search, setSearch] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isCreateView, setIsCreateView] = useState<any>(false);
  const [isFilter, setIsFilter] = useState(false);
  const [isCustomize, setIsCustomize] = useState(false);
  const [isToggled, toggle] = useToggle(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return {
    open,
    anchorEl,
    theme,
    search,
    setSearch,
    isOpenDrawer,
    setIsOpenDrawer,
    isFilter,
    setIsFilter,
    isCustomize,
    setIsCustomize,
    isToggled,
    toggle,
    handleClick,
    handleClose,
    isCreateView,
    setIsCreateView,
  };
};

export default useCompanies;
