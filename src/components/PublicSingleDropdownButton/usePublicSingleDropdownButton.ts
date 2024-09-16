import { Theme, useTheme } from '@mui/material';
import { useState } from 'react';
import { PublicSingleDropdownButtonCloseMenuI } from './PublicSingleDropdownButton.interface';

export const usePublicSingleDropdownButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open: boolean = Boolean(anchorEl);
  const theme: Theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose: PublicSingleDropdownButtonCloseMenuI = () => {
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
