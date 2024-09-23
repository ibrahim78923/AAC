import { useTheme } from '@mui/material';
import { useState } from 'react';

const useDealStage = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [tableRowValues, setTableRowValues] = useState();
  const [isFilterDrawer, setIsFilterDrawer] = useState(false);
  const [filterValues, setFilterValues] = useState({});

  const [alignment, setAlignment] = useState('UserDealStage');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  const open = Boolean(anchorEl);

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
    setIsFilterDrawer,
    setFilterValues,
    isFilterDrawer,
    filterValues,
    alignment,
    handleChange,
  };
};

export default useDealStage;
