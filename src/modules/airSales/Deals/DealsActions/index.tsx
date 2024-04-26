import { useState } from 'react';

import { Popover, Button, MenuItem, useTheme, Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { DealsActionInterfacePropsI } from './Actions.interface';

const DealsActions = ({
  onChange,
  menuItem = [],
  checkedRows,
}: DealsActionInterfacePropsI) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ width: { xs: '100%', sm: '100px' } }}>
      <Button
        variant="outlined"
        color="inherit"
        className="small"
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClick}
        disabled={checkedRows?.length < 1 ? true : false}
        classes={{ outlined: 'outlined_btn' }}
        sx={{ width: { xs: '100%', sm: '100px' } }}
      >
        Actions
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {menuItem?.map((item: any) => (
          <MenuItem
            sx={{
              fontSize: '16px',
              fontWeight: 400,
              color: theme?.palette?.grey[600],
            }}
            value={item}
            key={item}
            onClick={() => {
              onChange(item);
              handleClose();
            }}
          >
            {item}
          </MenuItem>
        ))}
      </Popover>
    </Box>
  );
};

export default DealsActions;
