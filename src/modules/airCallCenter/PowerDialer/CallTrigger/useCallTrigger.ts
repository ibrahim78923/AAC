import { useState } from 'react';

export const useCallTrigger = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [buttonName, setButtonName] = useState<string>('Contacts');
  const [search, setSearch] = useState<any>('');
  const [startPowerDialerModal, setStartPowerDialerModal] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'Call-Trigger-popover' : undefined;

  return {
    anchorEl,
    setAnchorEl,
    buttonName,
    setButtonName,
    search,
    setSearch,
    handleClick,
    handleClose,
    open,
    id,
    startPowerDialerModal,
    setStartPowerDialerModal,
  };
};
