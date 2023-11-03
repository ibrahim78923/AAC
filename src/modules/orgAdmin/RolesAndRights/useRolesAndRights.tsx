import { useState } from 'react';

import { useRouter } from 'next/router';

import { useTheme } from '@mui/material';

const useRolesAndRights = () => {
  const navigate = useRouter();
  const theme = useTheme();
  const [selectedValue, setSelectedValue] = useState(null);
  const [isOpenAddUserDrawer, setIsOpenAddUserDrawer] = useState(false);
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] = useState(false);

  const handleClose = () => {
    setSelectedValue(null);
  };

  const handleClick = (event: any) => {
    setSelectedValue(event.currentTarget);
  };
  return {
    navigate,
    theme,
    selectedValue,
    setSelectedValue,
    isOpenAddUserDrawer,
    setIsOpenAddUserDrawer,
    isOpenFilterDrawer,
    setIsOpenFilterDrawer,
    handleClose,
    handleClick,
  };
};

export default useRolesAndRights;
