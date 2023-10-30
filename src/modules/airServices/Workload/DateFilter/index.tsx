import { Box, Button, IconButton, Popover, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers';
import { PrimaryCalendarIcon } from '@/assets/icons';
import { Fragment, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const DateFilter = () => {
  //Date Popover
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // Date Filter Handler
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedWeekSpan = `${dayjs(selectedDate).format('MMMM DD')} - ${dayjs(
    selectedDate,
  )
    .add(6, 'day')
    .format('DD')}`;

  const handleDateSubmit = () => {
    // Filter Functionality Here
    handleClose();
  };

  return (
    <Fragment>
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
        <DateCalendar onChange={(date: any) => setSelectedDate(date)} />
        <hr />
        <Box textAlign={'end'} p={1}>
          <Button variant="outlined" type="button" sx={{ mx: 2 }}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" onClick={handleDateSubmit}>
            Apply
          </Button>
        </Box>
      </Popover>
    </Fragment>
  );
};
