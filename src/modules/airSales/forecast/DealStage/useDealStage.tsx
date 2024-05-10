import { useTheme } from '@mui/material';
import { useState } from 'react';

const useDealStage = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [tableRowValues, setTableRowValues] = useState();

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
  };
};

export default useDealStage;
