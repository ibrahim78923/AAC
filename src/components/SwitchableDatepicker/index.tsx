import React, { useState } from 'react';
import { Box, Stack, Button, List, ListItemButton } from '@mui/material';
import {
  PrimaryCalendarIcon,
  CanlendarButtonIcon,
  ArrowSquareLeftIcon,
  ArrowSquareRightIcon,
} from '@/assets/icons';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { styles } from './SwitchableDatepicker.style';
import { DATE_FORMAT } from '@/constants';

const SwitchableDatepicker = ({
  renderInput,
  dateValue,
  isCalendarOpen,
  setDateValue,
  handleDateSubmit,
  placement = 'left',
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState('today');
  const [isWeekPicker, setIsWeekPicker] = useState(false);
  const [isMonthPicker, setIsMonthPicker] = useState(false);
  const [isYearPicker, setIsYearPicker] = useState(false);
  const [isRangePicker, setIsRangePicker] = useState(false);
  const [startDate, setStartDate]: any = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: string,
  ) => {
    setSelectedIndex(index);
    if (index === 'custom') {
      setStartDate(null);
      setEndDate(null);
      setIsWeekPicker(false);
      setIsMonthPicker(false);
      setIsYearPicker(false);
      setIsRangePicker(true);
    } else if (index === 'year') {
      setStartDate(null);
      setEndDate(null);
      setIsWeekPicker(false);
      setIsMonthPicker(false);
      setIsYearPicker(true);
      setIsRangePicker(false);
    } else if (index === 'month') {
      setStartDate(null);
      setEndDate(null);
      setIsWeekPicker(false);
      setIsMonthPicker(true);
      setIsYearPicker(false);
      setIsRangePicker(false);
    } else if (index === 'week') {
      setStartDate(null);
      setEndDate(null);
      setIsWeekPicker(true);
      setIsMonthPicker(false);
      setIsYearPicker(false);
      setIsRangePicker(false);
    } else {
      setStartDate(null);
      setEndDate(null);
      setIsWeekPicker(false);
      setIsMonthPicker(false);
      setIsYearPicker(false);
      setIsRangePicker(false);
    }
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleChange = (date: any) => {
    if (selectedIndex === 'custom') {
      const [start, end]: any = date;
      setStartDate(start);
      setEndDate(end);
      if (start && end) {
        setDateValue(date);
      }
    } else if (selectedIndex === 'year') {
      setStartDate(date);
      const start = new Date(date?.getFullYear(), 0, 1);
      const end = new Date(date?.getFullYear(), 11, 31);
      setDateValue([start, end]);
    } else if (selectedIndex === 'month') {
      setStartDate(date);
      const start = new Date(date);
      start?.setDate(1);
      const end = new Date(date);
      end?.setMonth(end.getMonth() + 1);
      end?.setDate(0);
      setDateValue([start, end]);
    } else if (selectedIndex === 'week') {
      setStartDate(date);
      const start = new Date(date);
      start.setDate(date.getDate() - date.getDay());
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      setDateValue([start, end]);
    } else {
      setStartDate(date);
      setDateValue([date, date]);
    }
  };

  // Datepicker custom container
  const Container = ({ children }: any) => {
    return (
      <Box
        sx={{
          bgcolor: (theme: any) => theme.palette.common?.white,
          border: (theme: any) =>
            `1px solid ${theme?.palette?.custom?.white_rock}`,
          borderRadius: '4px',
          maxWidth: '410px',
          position: 'absolute',
          top: '100%',
          left: placement === 'left' ? '0' : 'auto',
          right: placement === 'right' ? '0' : 'auto',
          zIndex: '1201',
        }}
      >
        <Box sx={styles?.dpContent}>
          <Box sx={styles?.dpSidebar}>
            <List component={'nav'} sx={styles.dpSidebarList}>
              <ListItemButton
                selected={selectedIndex === 'today'}
                onClick={(event: any) => handleListItemClick(event, 'today')}
              >
                Today
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 'week'}
                onClick={(event: any) => handleListItemClick(event, 'week')}
              >
                Week
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 'month'}
                onClick={(event: any) => handleListItemClick(event, 'month')}
              >
                Month
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 'year'}
                onClick={(event: any) => handleListItemClick(event, 'year')}
              >
                Year
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 'custom'}
                onClick={(event: any) => handleListItemClick(event, 'custom')}
              >
                Custom
              </ListItemButton>
            </List>
          </Box>
          <Box sx={styles.dpBody}>{children}</Box>
        </Box>
        <Box sx={styles.dpFooter}>
          <Box sx={styles.dpFooterText}>
            {dateValue && (
              <>
                {dayjs(dateValue[0]).format(DATE_FORMAT.UI)} -{' '}
                {dayjs(dateValue[1]).format(DATE_FORMAT.UI)}
              </>
            )}
          </Box>
          <Stack direction="row" spacing="12px">
            <Button
              className="small"
              variant="outlined"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="small"
              variant="contained"
              onClick={() => {
                handleDateSubmit?.();
                setIsOpen(false);
              }}
            >
              Apply
            </Button>
          </Stack>
        </Box>
      </Box>
    );
  };

  let dateString = '';
  if (dateValue) {
    const START_DATE = dateValue[0];
    const END_DATE = dateValue[1];
    dateString =
      dayjs(START_DATE).format(DATE_FORMAT.UI) +
      ' - ' +
      dayjs(END_DATE).format(DATE_FORMAT.UI);
  }

  return (
    <Box sx={{ position: 'relative' }}>
      {renderInput &&
        (renderInput === 'button' ? (
          <Button
            className="small"
            variant="outlined"
            color="inherit"
            onClick={handleClick}
          >
            <CanlendarButtonIcon />
            <Box sx={{ ml: '8px', display: 'inline-flex' }}>Date</Box>
          </Button>
        ) : (
          <Stack
            direction="row"
            gap={1}
            onClick={handleClick}
            sx={{ cursor: 'pointer' }}
          >
            <PrimaryCalendarIcon />
            {dateString}
            <Stack sx={{ cursor: 'pointer' }} direction="row">
              <ArrowSquareLeftIcon />
              <ArrowSquareRightIcon />
            </Stack>
          </Stack>
        ))}

      {(isCalendarOpen || isOpen) && (
        <>
          <DatePicker
            inline
            calendarContainer={Container}
            selected={startDate}
            onChange={handleChange}
            showWeekPicker={isWeekPicker}
            showMonthYearPicker={isMonthPicker}
            showYearPicker={isYearPicker}
            startDate={startDate}
            endDate={endDate}
            selectsRange={isRangePicker}
          />
        </>
      )}
    </Box>
  );
};

export default SwitchableDatepicker;
