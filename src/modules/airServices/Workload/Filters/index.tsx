import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Popover,
  Typography,
} from '@mui/material';
import { FilterSharedIcon } from '@/assets/icons';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useFilters from './useFilters';

export const Filters = ({ setFilter }: any) => {
  const { id, handleClick, open, anchorEl, handleClose } = useFilters();

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
              <Button
                color={'secondary'}
                sx={{ fontWeight: 400 }}
                onClick={() =>
                  setFilter({
                    countDayWise: true,
                    countDayWiseHours: undefined,
                    countDayWiseHoursAverage: undefined,
                  })
                }
              >
                Workload count
              </Button>
              <Button
                color={'secondary'}
                sx={{ fontWeight: 400 }}
                onClick={() =>
                  setFilter({
                    countDayWise: undefined,
                    countDayWiseHours: true,
                    countDayWiseHoursAverage: undefined,
                  })
                }
              >
                Workload hours
              </Button>
              <Button
                color={'secondary'}
                sx={{ fontWeight: 400 }}
                onClick={() =>
                  setFilter({
                    countDayWise: undefined,
                    countDayWiseHours: undefined,
                    countDayWiseHoursAverage: true,
                  })
                }
              >
                Workload hours as %
              </Button>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Popover>
    </>
  );
};
