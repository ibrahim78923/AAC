import React from 'react';
import { Popover, Button, MenuItem, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { TaskInterfacePropsI } from './ActionBtn.interface';

const ActionBtn = ({
  disableActionBtn,
  onChange,
  variant = 'outlined',
  menuItems,
  title = 'Actions',
  color = 'inherit',
}: TaskInterfacePropsI) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        className="small"
        color={color}
        variant={variant}
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClick}
        disabled={disableActionBtn}
        classes={{ outlined: 'outlined_btn' }}
        type="submit"
        // sx={styles(theme, disableActionBtn)}
        sx={{
          borderColor: disableActionBtn ? theme?.palette?.custom?.dark : '',
          width: { xs: '100%', sm: 'auto' },
          color: disableActionBtn ? theme?.palette?.custom?.dark : '',
        }}
      >
        {title}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {menuItems.map((item: any) => (
          <MenuItem
            onClick={() => {
              onChange(item?.name);
              handleClose();
            }}
            key={item?.item}
          >
            {item?.item}
          </MenuItem>
        ))}
      </Popover>
    </>
  );
};

export default ActionBtn;
