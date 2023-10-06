import * as React from 'react';
import Popover from '@mui/material/Popover';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { PopoverStyles } from './Popover.style';
import { uuid } from 'uuidv4';
export default function ActionPopover({ btnText, options }: any) {
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
        // color={theme?.palette?.custom?.main||""}
        onClick={handleClick}
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
        <Box sx={{ minWidth: 120 }}>
          {options && options.length > 0 && (
            <ul>
              {options.map((option: any) => (
                <li key={uuid()}>{option}</li>
              ))}
            </ul>
          )}
        </Box>
      </Popover>
    </div>
  );
}
