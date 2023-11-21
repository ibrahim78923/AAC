import { Theme, useTheme } from '@mui/material';

import { useRouter } from 'next/router';

import { useState } from 'react';

const useSMSBroadcast = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const theme = useTheme<Theme>();
  const navigate = useRouter();

  const handleClose = () => {
    setSelectedValue(null);
  };

  const handleDelete = () => {
    setSelectedValue(null);
    setIsDelete(true);
  };

  const handleClick = (event: any) => {
    setSelectedValue(event?.currentTarget);
  };

  const statusTag = (val: any) => {
    switch (val) {
      case 'Completed':
        return theme?.palette?.primary?.main;
      case 'Scheduled':
        return theme?.palette?.warning?.main;
      case 'Draft':
        return theme?.palette?.grey[900];
      case 'Processing':
        return theme?.palette?.success?.main;
    }
  };

  return {
    selectedValue,
    handleDelete,
    handleClose,
    handleClick,
    setIsDelete,
    statusTag,
    navigate,
    isDelete,
    theme,
  };
};

export default useSMSBroadcast;
