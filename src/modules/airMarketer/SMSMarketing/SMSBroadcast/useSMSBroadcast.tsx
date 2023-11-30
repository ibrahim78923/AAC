import { AIR_MARKETER } from '@/routesConstants/paths';
import { Theme, useTheme } from '@mui/material';

import { useRouter } from 'next/router';

import { useState } from 'react';

const useSMSBroadcast = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const theme = useTheme<Theme>();
  const navigate = useRouter();

  const handleClose = () => {
    setSelectedValue(null);
  };

  const handleDelete = () => {
    setSelectedValue(null);
    setIsDelete(true);
  };

  const handleEdit = () => {
    setSelectedValue(null);
    navigate.push({
      pathname: AIR_MARKETER?.CREATE_SMS_BROADCAST,
      query: { type: 'edit' },
    });
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
    handleEdit,
    setIsDelete,
    statusTag,
    navigate,
    isDelete,
    selectedId,
    setSelectedId,
    theme,
  };
};

export default useSMSBroadcast;
