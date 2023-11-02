import { Box, IconButton, Popover, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers';
import { PrimaryCalendarIcon } from '@/assets/icons';
import { Fragment, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const DateFilter = ({ setDateCalendar }: any) => {
  //Date Popover
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: any) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // Date Filter Handler
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Date to be displayed
  const formattedWeekSpan = `${dayjs(selectedDate)?.format(
    'MMMM DD',
  )} - ${dayjs(selectedDate)?.add(6, 'day')?.format('DD')}`;

  const handlePrevClick = () => {
    const newDate = dayjs(selectedDate)?.subtract(1, 'week')?.toDate();
    setSelectedDate(newDate);
    setDateCalendar(newDate);
  };

  const handleNextClick = () => {
    const newDate = dayjs(selectedDate)?.add(1, 'week')?.toDate();
    setSelectedDate(newDate);
    setDateCalendar(newDate);
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
        <DateCalendar
          onChange={(date: any) => {
            setDateCalendar(date);
            setSelectedDate(date);
          }}
        />
      </Popover>
    </Fragment>
  );
};
