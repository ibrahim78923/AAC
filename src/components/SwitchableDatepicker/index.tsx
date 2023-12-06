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
  renderInput = 'button',
  dateValue,
  setDateValue,
  handleDateSubmit,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isWeekPicker, setIsWeekPicker] = useState(false);
  const [isMonthPicker, setIsMonthPicker] = useState(false);
  const [isYearPicker, setIsYearPicker] = useState(false);
  const [isRangePicker, setIsRangePicker] = useState(false);
  const [startDate, setStartDate]: any = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    if (index === 4) {
      setStartDate(null);
      setEndDate(null);
      setIsWeekPicker(false);
      setIsMonthPicker(false);
      setIsYearPicker(false);
      setIsRangePicker(true);
    } else if (index === 3) {
      setStartDate(null);
      setEndDate(null);
      setIsWeekPicker(false);
      setIsMonthPicker(false);
      setIsYearPicker(true);
      setIsRangePicker(false);
    } else if (index === 2) {
      setStartDate(null);
      setEndDate(null);
      setIsWeekPicker(false);
      setIsMonthPicker(true);
      setIsYearPicker(false);
      setIsRangePicker(false);
    } else if (index === 1) {
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
    if (selectedIndex === 4) {
      const [start, end]: any = date;
      setStartDate(start);
      setEndDate(end);
      if (start && end) {
        setDateValue(date);
      }
    } else if (selectedIndex === 3) {
      setStartDate(date);
      const start = new Date(date?.getFullYear(), 0, 1);
      const end = new Date(date?.getFullYear(), 11, 31);
      setDateValue([start, end]);
    } else if (selectedIndex === 2) {
      setStartDate(date);
      const start = new Date(date);
      start?.setDate(1);
      const end = new Date(date);
      end?.setMonth(end.getMonth() + 1);
      end?.setDate(0);
      setDateValue([start, end]);
    } else if (selectedIndex === 1) {
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
      <Box sx={styles.dpContainer}>
        <Box sx={styles.dpContent}>
          <Box sx={styles.dpSidebar}>
            <List component={'nav'} sx={styles.dpSidebarList}>
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event: any) => handleListItemClick(event, 0)}
              >
                Today
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event: any) => handleListItemClick(event, 1)}
              >
                Week
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 2}
                onClick={(event: any) => handleListItemClick(event, 2)}
              >
                Month
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 3}
                onClick={(event: any) => handleListItemClick(event, 3)}
              >
                Year
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 4}
                onClick={(event: any) => handleListItemClick(event, 4)}
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
    dateString =
      dayjs(dateValue[0]).format(DATE_FORMAT.UI) +
      ' - ' +
      dayjs(dateValue[1]).format(DATE_FORMAT.UI);
  }

  return (
    <Box sx={{ position: 'relative' }}>
      {renderInput === 'button' ? (
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
      )}
      {isOpen && (
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
