import React, { useState } from 'react';
import {
  Box,
  Stack,
  Button,
  List,
  ListItemButton,
  TextField,
  Typography,
} from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DATE_FORMAT } from '@/constants';
import CustomLabel from '../CustomLabel';
import { styles } from './RHFSwitchableDatepicker.style';

const RHFSwitchableDatepicker = ({ name, required, ...other }: any) => {
  const { control, setValue } = useFormContext();
  const [formattedDate, setFormattedDate] = useState<string>('');
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
        setValue(name, date);
        setFormattedDate(
          `${dayjs(start).format(DATE_FORMAT.UI)} - ${dayjs(end).format(
            DATE_FORMAT.UI,
          )}`,
        );
      }
    } else if (selectedIndex === 'year') {
      setStartDate(date);
      const start = new Date(date?.getFullYear(), 0, 1);
      const end = new Date(date?.getFullYear(), 11, 31);
      setFormattedDate(
        `${dayjs(start).format(DATE_FORMAT.UI)} - ${dayjs(end).format(
          DATE_FORMAT.UI,
        )}`,
      );
      setValue(name, [start, end]);
    } else if (selectedIndex === 'month') {
      setStartDate(date);
      const start = new Date(date);
      start?.setDate(1);
      const end = new Date(date);
      end?.setMonth(end.getMonth() + 1);
      end?.setDate(0);
      setFormattedDate(
        `${dayjs(start).format(DATE_FORMAT.UI)} - ${dayjs(end).format(
          DATE_FORMAT.UI,
        )}`,
      );
      setValue(name, [start, end]);
    } else if (selectedIndex === 'week') {
      setStartDate(date);
      const start = new Date(date);
      start.setDate(date.getDate() - date.getDay());
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      setFormattedDate(
        `${dayjs(start).format(DATE_FORMAT.UI)} - ${dayjs(end).format(
          DATE_FORMAT.UI,
        )}`,
      );
      setValue(name, [start, end]);
    } else {
      setStartDate(date);
      setFormattedDate(`${dayjs(date).format(DATE_FORMAT.UI)}`);
      setValue(name, [date, date]);
    }
  };

  // Datepicker custom container
  const Container = ({ children }: any) => {
    return (
      <Box sx={styles?.dpContainer}>
        <Box sx={styles?.dpContent}>
          <Box sx={styles?.dpSidebar}>
            <List component={'nav'} sx={styles?.dpSidebarList}>
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
          <Box sx={styles?.dpBody}>{children}</Box>
        </Box>
        <Box sx={styles?.dpFooter}>
          <Box sx={styles?.dpFooterText}>{formattedDate}</Box>
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
              onClick={() => setIsOpen(false)}
            >
              Apply
            </Button>
          </Stack>
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            {other?.label && (
              <CustomLabel label={other?.label} required={required} />
            )}
            <TextField
              onClick={handleClick}
              {...field}
              fullWidth
              error={!!error}
              helperText={
                <Typography
                  component={'span'}
                  sx={{ display: 'block', mt: -1, ml: -1 }}
                >
                  {error?.message}
                </Typography>
              }
              FormHelperTextProps={{
                classes: {
                  root: '',
                  color: 'green',
                },
              }}
              {...other}
              label=""
              value={formattedDate}
            />
          </>
        )}
      />
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

export default RHFSwitchableDatepicker;
