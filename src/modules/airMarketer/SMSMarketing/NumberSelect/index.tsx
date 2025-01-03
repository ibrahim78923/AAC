import {
  Box,
  Checkbox,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styles } from './NumberSelect.style';
import { UserAvatarImage } from '@/assets/images';
import Image from 'next/image';
import { ArrowDownIcon } from '@/assets/icons';

const NumberSelect = () => {
  const smallScreen = useMediaQuery('(min-width: 380px)');
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        id="basic-button"
        variant="outlined"
        color="inherit"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={styles?.dropdownBtn}
      >
        <UserInfo
          avatarSrc={UserAvatarImage}
          name="John Doe"
          phone="+1234567890"
          open={open}
          isDropdown
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Box
          sx={{
            padding: '0px 15px',
            width: !smallScreen ? '180px' : '150px',
            my: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontSize: '12px', color: theme?.palette?.grey[900] }}
          >
            Registered Numbers{' '}
          </Typography>
        </Box>
        <MenuItem onClick={handleClose} sx={styles?.menuItem(theme)}>
          <UserInfo
            avatarSrc={UserAvatarImage}
            name="John Doe"
            phone="+1234567890"
            isSelected
          />
        </MenuItem>
        <MenuItem onClick={handleClose} sx={styles?.menuItem(theme)}>
          <UserInfo
            avatarSrc={UserAvatarImage}
            name="John Doe"
            phone="+1234567890"
          />
        </MenuItem>
      </Menu>
    </Box>
  );
};

const UserInfo: React.FC<any> = ({
  avatarSrc,
  name,
  phone,
  open,
  isDropdown,
  isSelected,
}: any) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Image
        style={{ width: '36px', height: '36px', borderRadius: '50%' }}
        src={avatarSrc}
        alt="User"
      />
      <Box sx={{ textAlign: 'left' }}>
        <Typography
          variant="body2"
          sx={{ fontSize: '12px', color: theme?.palette?.grey[900] }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: '14px', color: theme?.palette?.custom?.main }}
        >
          {phone}
        </Typography>
      </Box>
      {isDropdown && (
        <Box
          sx={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            height: '20px',
          }}
        >
          <ArrowDownIcon size={20} />
        </Box>
      )}
      {isSelected && (
        <Box>
          <Checkbox checked />
        </Box>
      )}
    </Box>
  );
};

export default NumberSelect;
