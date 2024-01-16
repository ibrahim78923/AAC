import { Box, IconButton, Popover, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers';
import { PrimaryCalendarIcon } from '@/assets/icons';
import { useMemo, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const DateFilter = ({ setDateCalendar, dateCalendar }: any) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: any) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const formattedWeekSpan = useMemo(() => {
    return `${dayjs(dateCalendar)?.startOf('week')?.format('MMM DD')} - ${dayjs(
      dateCalendar,
    )
      ?.endOf('week')
      ?.format('MMM DD')}`;
  }, [dateCalendar]);

  const prevButtonClickHandler = () => {
    setDateCalendar(dayjs(dateCalendar)?.subtract(1, 'week')?.toISOString());
  };

  const nextButtonClickHandler = () => {
    setDateCalendar(
      dayjs(dateCalendar)?.add(1, 'week')?.startOf('week')?.toISOString(),
    );
  };

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
          onClick={prevButtonClickHandler}
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
          onClick={nextButtonClickHandler}
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
          }}
        />
      </Popover>
    </>
  );
};
