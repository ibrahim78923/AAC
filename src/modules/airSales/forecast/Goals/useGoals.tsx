import { useGetForecastGoalsQuery } from '@/services/airSales/forecast';
import { useTheme } from '@mui/material';
import { useState } from 'react';

const useGoals = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [tableRowValues, setTableRowValues] = useState();
  const [isEditDrawer, setIsEditDrawer] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const open = Boolean(anchorEl);

  const { data: goalsData } = useGetForecastGoalsQuery({});

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  return {
    theme,
    anchorEl,
    isDisabled,
    setIsDisabled,
    tableRowValues,
    setTableRowValues,
    open,
    handleClose,
    handleClick,
    setAnchorEl,
    isEditDrawer,
    setIsEditDrawer,
    isDelete,
    setIsDelete,
    goalsData,
  };
};

export default useGoals;
