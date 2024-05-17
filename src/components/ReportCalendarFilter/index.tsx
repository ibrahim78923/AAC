import { useReportCalendarFilter } from './useReportCalendarFilter';
import { Box, Button, Divider, Popover } from '@mui/material';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function ReportCalendarFilter(props: any) {
  const {
    theme,
    handleSelect,
    idDate,
    openDate,
    handleCloseDate,
    handleClickDate,
    anchorElDate,
    selectionRange,
    handleApplyFilter,
  } = useReportCalendarFilter(props);
  return (
    <>
      <Button
        sx={{
          height: '40px',
          color: theme?.palette?.grey[900],
          borderColor: theme?.palette?.custom?.dark,
        }}
        variant="outlined"
        color="secondary"
        onClick={handleClickDate}
        startIcon={<CalendarMonthIcon />}
      >
        Date
        <ArrowDropDownIcon />
      </Button>
      <Popover
        id={idDate}
        open={openDate}
        anchorEl={anchorElDate}
        onClose={handleCloseDate}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <DateRangePicker
          rangeColors={[theme?.palette?.primary?.main]}
          color={theme?.palette?.primary?.main}
          ranges={[selectionRange]}
          onChange={(ranges: any) => handleSelect(ranges)}
          inputRanges={[]}
        />
        <Divider flexItem />
        <Box justifyContent={'end'} display={'flex'} mb={2} mr={2} mt={1}>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ mr: '0.5rem' }}
            onClick={handleCloseDate}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleApplyFilter}>
            Apply
          </Button>
        </Box>
      </Popover>
    </>
  );
}
