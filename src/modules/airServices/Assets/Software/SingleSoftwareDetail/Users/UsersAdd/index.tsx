import * as React from 'react';
import Button from '@mui/material/Button';
import { AddIconWithBgBlack } from '@/assets/icons';

export const UsersAdd = () => {
  return (
    <div>
      <Button
        variant="outlined"
        id="demo-positioned-button"
        // aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        // aria-expanded={open ? 'true' : undefined}
        // onClick={handleClick}
        startIcon={<AddIconWithBgBlack />}
        color="secondary"
      >
        Add User
      </Button>
    </div>
  );
};
