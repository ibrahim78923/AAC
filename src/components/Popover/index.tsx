import * as React from 'react';
import Popover from '@mui/material/Popover';
import { Box, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import { PopoverStyles } from './Popover.style';
import { uuid } from 'uuidv4';
export default function ActionPopover({ btnText, options, endIcon }: any) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div>
      <Button
        aria-describedby={id}
        variant="outlined"
        sx={PopoverStyles?.actionBtn}
        onClick={handleClick}
        endIcon={endIcon}
      >
        {btnText}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box>
          {options && options.length > 0 && (
            <ul>
              {options.map((option: any) => (
                <MenuItem key={uuid()} onClick={option?.handleClick}>
                  {option?.label}
                </MenuItem>
              ))}
            </ul>
          )}
        </Box>
      </Popover>
    </div>
  );
}
