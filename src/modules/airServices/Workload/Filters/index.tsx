import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Popover,
  Typography,
} from '@mui/material';
import { Fragment, useState } from 'react';
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

  // First Accordion Management
  const [checked, setChecked] = useState([true, false]);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event?.target?.checked, event?.target?.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event?.target?.checked, checked?.[1]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked?.[0], event?.target?.checked]);
  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="Tasks"
        control={<Checkbox checked={checked?.[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Tickets"
        control={<Checkbox checked={checked?.[1]} onChange={handleChange3} />}
      />
    </Box>
  );

  const handleApply = () => {
    handleClose();
  };

  return (
    <Fragment>
      <Button
        variant={'outlined'}
        color={'secondary'}
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
              sx={{ flexDirection: 'row-reverse', p: 0 }}
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="body2">Filter by type</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ py: 0, mt: -1 }}>
              <FormControlLabel
                label="All"
                control={
                  <Checkbox
                    checked={checked?.[0] && checked?.[1]}
                    indeterminate={checked?.[0] !== checked?.[1]}
                    onChange={handleChange1}
                  />
                }
              />
              {children}
            </AccordionDetails>
            <Box textAlign={'end'}>
              <Button
                variant={'outlined'}
                color={'secondary'}
                type={'button'}
                sx={{ mr: 1 }}
              >
                Reset
              </Button>
              <Button
                variant={'contained'}
                type={'submit'}
                onClick={handleApply}
              >
                Apply
              </Button>
            </Box>
          </Accordion>
          <Accordion>
            <AccordionSummary
              sx={{ flexDirection: 'row-reverse', p: 0 }}
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography variant="body2">Workload count</Typography>
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
    </Fragment>
  );
};
