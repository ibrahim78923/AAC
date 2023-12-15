import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Popover } from '@mui/material';
import { RHFTextField } from '@/components/ReactHookForm';
import { useWorkflowDateRange } from './useWorkflowDateRange';

export const WorkflowDateRange = (props: any) => {
  const {
    startDate,
    endDate,
    formatDate,
    handleClick,
    handleClose,
    open,
    handleDateChange,
    anchorEl,
  } = useWorkflowDateRange(props);
  return (
    <>
      <RHFTextField
        value={`${formatDate(startDate)} ${
          formatDate(startDate) ? '-' : ''
        } ${formatDate(endDate)}`}
        fullWidth
        InputProps={{
          readOnly: true,
        }}
        label="Custom Range"
        name={'scheduleDateRange'}
        onClick={handleClick}
        size="small"
        {...props}
      />
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
        <DatePicker
          name="scheduleDateRange"
          selected={startDate}
          onChange={handleDateChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />
      </Popover>
    </>
  );
};
