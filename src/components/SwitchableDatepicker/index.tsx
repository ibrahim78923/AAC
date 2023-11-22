import React, { useState } from 'react';
import {
  Box,
  Stack,
  TextField,
  Button,
  List,
  ListItemButton,
} from '@mui/material';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { styles } from './SwitchableDatepicker.style';

const SwitchableDatepicker = ({ error, field, ...other }: any) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMonthYearPicker, setIsMonthYearPicker] = useState(false);
  const [isYearPicker, setIsYearPicker] = useState(false);
  const [isRangePicker, setIsRangePicker] = useState(false);
  const [startDate, setStartDate]: any = useState(null);
  const [endDate, setEndDate]: any = useState(null);
  const [dateFormat, setDateFormat] = useState('MM/dd/yyyy');

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    if (index === 4) {
      setDateFormat('MM/dd/yyyy');
      setStartDate(null);
      setEndDate(null);
      setIsMonthYearPicker(false);
      setIsYearPicker(false);
      setIsRangePicker(true);
    } else if (index === 3) {
      setDateFormat('yyyy');
      setStartDate(null);
      setEndDate(null);
      setIsRangePicker(false);
      setIsMonthYearPicker(false);
      setIsYearPicker(true);
    } else if (index === 2) {
      setDateFormat('MM/yyyy');
      setStartDate(null);
      setEndDate(null);
      setIsRangePicker(false);
      setIsYearPicker(false);
      setIsMonthYearPicker(true);
    } else if (index === 1) {
      setDateFormat('MM/dd/yyyy');
      setStartDate(null);
      setEndDate(null);
      setIsRangePicker(false);
      setIsYearPicker(false);
      setIsMonthYearPicker(false);
    } else {
      setDateFormat('MM/dd/yyyy');
      setStartDate(null);
      setEndDate(null);
      setIsRangePicker(false);
      setIsMonthYearPicker(false);
      setIsYearPicker(false);
    }
  };

  const handleDateChange = (date: any) => {
    if (selectedIndex === 4) {
      const [start, end]: any = date;
      setStartDate(start);
      setEndDate(end);
    } else if (selectedIndex === 3) {
      const startOfYear = new Date(date?.getFullYear(), 0, 1);
      const endOfYear = new Date(date?.getFullYear(), 11, 31);
      setStartDate(startOfYear);
      setEndDate(endOfYear);
    } else if (selectedIndex === 2) {
      const startOfMonth = new Date(date);
      startOfMonth?.setDate(1);
      const endOfMonth = new Date(date);
      endOfMonth?.setMonth(endOfMonth.getMonth() + 1);
      endOfMonth?.setDate(0);
      setStartDate(startOfMonth);
      setEndDate(endOfMonth);
    } else if (selectedIndex === 1) {
      const startOfWeek = new Date(date);
      startOfWeek?.setDate(date?.getDate() - date?.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek?.getDate() + 6);
      setStartDate(startOfWeek);
      setEndDate(endOfWeek);
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };

  const getStartAndEndOfWeek = (date: any) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return [startOfWeek, endOfWeek];
  };

  const getStartAndEndOfMonth = (date: any) => {
    const startOfMonth = new Date(date);
    startOfMonth?.setDate(1);
    const endOfMonth = new Date(date);
    endOfMonth?.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth?.setDate(0);
    return [startOfMonth, endOfMonth];
  };

  const getStartAndEndOfYear = (date: any) => {
    const startOfYear = new Date(date?.getFullYear(), 0, 1);
    const endOfYear = new Date(date?.getFullYear(), 11, 31);
    return [startOfYear, endOfYear];
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
                onClick={(event) => handleListItemClick(event, 0)}
              >
                Today
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
              >
                Week
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                Month
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
              >
                Year
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 4}
                onClick={(event) => handleListItemClick(event, 4)}
              >
                Custom
              </ListItemButton>
            </List>
          </Box>
          <Box sx={styles.dpBody}>{children}</Box>
        </Box>
        <Box sx={styles.dpFooter}>
          <Box sx={styles.dpFooterText}>
            {startDate && (
              <>
                {dayjs(startDate).format('MMMM DD, YYYY')}{' '}
                {endDate && <> - {dayjs(endDate).format('MMMM DD, YYYY')}</>}
              </>
            )}
          </Box>
          <Stack direction="row" spacing="12px">
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained">Apply</Button>
          </Stack>
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={styles.dpWrapper}>
      {selectedIndex === 4 ? (
        <DatePicker
          {...field}
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          onChange={(date: any) => {
            field.onChange(date);
            handleDateChange(date);
          }}
          dateFormat={dateFormat}
          shouldCloseOnSelect={false}
          isClearable
          calendarContainer={Container}
          showMonthYearPicker={isMonthYearPicker}
          showYearPicker={isYearPicker}
          selectsRange={isRangePicker}
          customInput={
            <TextField
              label="Created Date"
              size="small"
              fullWidth
              error={!!error}
              helperText={error?.message}
              {...other}
            />
          }
        />
      ) : (
        <DatePicker
          {...field}
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          onChange={(date: any) => {
            field.onChange(
              selectedIndex === 1
                ? getStartAndEndOfWeek(date)
                : selectedIndex === 2
                ? getStartAndEndOfMonth(date)
                : selectedIndex === 3
                ? getStartAndEndOfYear(date)
                : date,
            );
            handleDateChange(date);
          }}
          dateFormat={dateFormat}
          shouldCloseOnSelect={false}
          isClearable
          calendarContainer={Container}
          showMonthYearPicker={isMonthYearPicker}
          showYearPicker={isYearPicker}
          selectsRange={isRangePicker}
          customInput={
            <TextField
              label="Created Date"
              size="small"
              fullWidth
              error={!!error}
              helperText={error?.message}
              {...other}
            />
          }
        />
      )}
    </Box>
  );
};

export default SwitchableDatepicker;
