import { useTheme } from '@mui/material';
import { useState } from 'react';
import RequestApprovalPageStyles from './RequestApprovalPage.style';

export function useRequestApprovalPageState() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const styles = RequestApprovalPageStyles();

  const textColor: any = {
    Request: '#0AADC7',
    Recieve: theme?.palette?.primary?.main,
    Approve: theme?.palette?.success?.main,
    Reject: theme?.palette?.error?.main,
    Cancel: theme?.palette?.grey?.[900],
  };

  return {
    theme,
    open,
    handleClick,
    handleClose,
    styles,
    textColor,
    anchorEl,
    setAnchorEl,
  };
}
