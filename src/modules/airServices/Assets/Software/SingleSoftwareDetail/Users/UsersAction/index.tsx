import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { v4 as uuidv4 } from 'uuid';
import { Typography, useTheme } from '@mui/material';

export const UsersAction = (props: any) => {
  const { actionDropdownData } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="outlined"
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
        color="secondary"
      >
        Action
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ padding: 2 }}
      >
        {actionDropdownData?.map((x: any) => (
          <MenuItem
            key={uuidv4()}
            onClick={() => x?.handleClick?.(handleClose)}
            sx={{
              '&.MuiMenuItem-root': {
                marginBottom: { md: 0.5 },
                marginX: { md: 0.5 },
              },
            }}
          >
            <Typography
              variant="body2"
              color={theme.palette.grey?.[600]}
              fontWeight={500}
            >
              {x?.title}{' '}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
