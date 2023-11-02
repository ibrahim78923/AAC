import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { MouseEvent, useState } from 'react';

export const useHeader = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const router = useRouter();
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return {
    anchorEl,
    setAnchorEl,
    open,
    theme,
    handleClick,
    handleClose,
    router,
  };
};
