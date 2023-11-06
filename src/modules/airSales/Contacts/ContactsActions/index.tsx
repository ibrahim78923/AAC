import { useState } from 'react';

import { Popover, Button, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { ContactsActionInterfacePropsI } from './Actions.interface';

import { styles } from './ActionBtn.style';

const ContactsActions = ({
  disableActionBtn,
  onChange,
  menuItem = [],
}: ContactsActionInterfacePropsI) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        variant="outlined"
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClick}
        disabled={disableActionBtn}
        classes={{ outlined: 'outlined_btn' }}
        sx={styles.ActionBtn}
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
        {menuItem.map((item) => (
          <MenuItem
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
    </div>
  );
};

export default ContactsActions;
