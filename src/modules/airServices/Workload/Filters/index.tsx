import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Popover,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { FilterSharedIcon } from '@/assets/icons';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const Filters = () => {
  // Popover open
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Button
        variant={'outlined'}
        color={'inherit'}
        aria-describedby={id}
        onClick={handleClick}
        startIcon={<FilterSharedIcon />}
      >
        Filters
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
        <Box width={250} p={1}>
          <Accordion>
            <AccordionSummary
              sx={{
                flexDirection: 'row-reverse',
                p: 0,
                '& > :first-child': { variant: 'body2' },
              }}
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Workload count</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ py: 0, mt: -1 }}>
              <Button color={'secondary'} sx={{ fontWeight: 400 }}>
                Workload count
              </Button>
              <Button color={'secondary'} sx={{ fontWeight: 400 }}>
                Workload hours
              </Button>
              <Button color={'secondary'} sx={{ fontWeight: 400 }}>
                Workload hours as %
              </Button>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Popover>
    </>
  );
};
