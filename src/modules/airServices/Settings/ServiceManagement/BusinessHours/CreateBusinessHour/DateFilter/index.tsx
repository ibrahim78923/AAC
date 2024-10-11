import { Box, IconButton, Popover, Typography } from '@mui/material';
import { PrimaryCalendarIcon } from '@/assets/icons';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { DateRange } from 'react-date-range';
import useDateFilter from './useDateFilter';

export const DateFilter = ({ dateRange, setDateRange }: any) => {
  const {
    handleOpen,
    formattedWeekSpan,
    handlePrevClick,
    handleNextClick,
    open,
    anchorEl,
    handleClose,
  } = useDateFilter({ dateRange, setDateRange });

  return (
    <>
      <Box display={'flex'} alignItems={'center'}>
        <Box
          onClick={handleOpen}
          display={'flex'}
          alignItems={'center'}
          sx={{ cursor: 'pointer' }}
        >
          <PrimaryCalendarIcon />
          <Typography variant={'body1'} fontWeight={500} ml={1}>
            {formattedWeekSpan}
          </Typography>
        </Box>
        <IconButton
          aria-label={'prev'}
          size={'small'}
          sx={{
            bgcolor: 'primary.main',
            borderRadius: 2,
            mx: 1,
            pl: 1,
            ':hover': { bgcolor: 'primary.main' },
          }}
          onClick={handlePrevClick}
        >
          <ArrowBackIosIcon
            sx={{ color: 'common.white', fontSize: '0.8rem' }}
          />
        </IconButton>
        <IconButton
          aria-label={'prev'}
          size={'small'}
          sx={{
            bgcolor: 'primary.main',
            borderRadius: 2,
            pl: 1,
            pr: 0.7,
            ':hover': { bgcolor: 'primary.main' },
          }}
          onClick={handleNextClick}
        >
          <ArrowForwardIosIcon
            sx={{ color: 'common.white', fontSize: '0.8rem' }}
          />
        </IconButton>
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <DateRange
          editableDateInputs={true}
          moveRangeOnFirstSelection={false}
          ranges={dateRange}
          onChange={(item: any) => setDateRange([item?.selection])}
        />
      </Popover>
    </>
  );
};
