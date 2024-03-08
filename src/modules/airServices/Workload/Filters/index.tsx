import { Box, Button, Popover, Typography } from '@mui/material';
import { FilterSharedIcon } from '@/assets/icons';
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
        <Box width={250} p={2}>
          <Typography
            variant={'body2'}
            color={'secondary.main'}
            sx={{ cursor: 'pointer' }}
            onClick={() =>
              setFilter({
                countDayWise: undefined,
                countDayWiseHours: undefined,
                countDayWiseHoursAverage: undefined,
              })
            }
          >
            None
          </Typography>
          <Typography
            variant={'body2'}
            color={'secondary.main'}
            my={2}
            sx={{ cursor: 'pointer' }}
            onClick={() =>
              setFilter({
                countDayWise: true,
                countDayWiseHours: undefined,
                countDayWiseHoursAverage: undefined,
              })
            }
          >
            Workload count
          </Typography>
          <Typography
            variant={'body2'}
            color={'secondary.main'}
            sx={{ cursor: 'pointer' }}
            onClick={() =>
              setFilter({
                countDayWise: undefined,
                countDayWiseHours: true,
                countDayWiseHoursAverage: undefined,
              })
            }
          >
            Workload hours
          </Typography>
          <Typography
            variant={'body2'}
            color={'secondary.main'}
            mt={2}
            sx={{ cursor: 'pointer' }}
            onClick={() =>
              setFilter({
                countDayWise: undefined,
                countDayWiseHours: undefined,
                countDayWiseHoursAverage: true,
              })
            }
          >
            Workload hours as %
          </Typography>
        </Box>
      </Popover>
    </>
  );
};
