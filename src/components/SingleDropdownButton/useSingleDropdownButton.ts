import { Theme, useTheme } from '@mui/material';
import { useState } from 'react';
import { SingleDropdownButtonCloseMenuI } from './SingleDropdownButton.interface';

export const useSingleDropdownButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open: boolean = Boolean(anchorEl);
  const theme: Theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose: SingleDropdownButtonCloseMenuI = () => {
    setAnchorEl(null);
  };

  return {
    anchorEl,
    open,
    theme,
    handleClick,
    handleClose,
  };
};
