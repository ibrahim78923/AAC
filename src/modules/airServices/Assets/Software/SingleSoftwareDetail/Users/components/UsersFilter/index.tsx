import * as React from 'react';
import Button from '@mui/material/Button';
import { FilterIcon } from '@/assets/icons';

export const UsersFilter = () => {
  return (
    <div>
      <Button
        variant="outlined"
        id="demo-positioned-button"
        // aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        // aria-expanded={open ? 'true' : undefined}
        // onClick={handleClick}
        startIcon={<FilterIcon />}
        color="secondary"
      >
        Filter
      </Button>
    </div>
  );
};
