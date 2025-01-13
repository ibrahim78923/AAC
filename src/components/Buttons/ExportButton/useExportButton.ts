import { useTheme } from '@mui/material';
import { useState } from 'react';

export const useExportButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
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
