import { useState } from 'react';

import { Popover, Button, MenuItem, Typography, Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { styles } from './ActionBtn.style';
import Image from 'next/image';
import { GroupAppAvatarImage } from '@/assets/images';
import { platFormDropdownData } from './PostActions.data';

import { v4 as uuidv4 } from 'uuid';

const ContactsActions = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
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
        classes={{ outlined: 'outlined_btn' }}
        sx={styles?.ActionBtn}
      >
        <Image src={GroupAppAvatarImage} alt="icon" />
        <Typography>Platfoms</Typography>
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
        {platFormDropdownData?.map((item) => (
          <MenuItem key={uuidv4()}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Box>{item?.icon}</Box>
              {item?.platform}
            </Box>
          </MenuItem>
        ))}
      </Popover>
    </div>
  );
};

export default ContactsActions;
