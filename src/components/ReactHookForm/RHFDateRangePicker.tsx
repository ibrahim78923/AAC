import { Controller, useFormContext } from 'react-hook-form';
import CustomLabel from '../CustomLabel';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {
  Box,
  IconButton,
  InputAdornment,
  Popover,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { ClearIcon, DateRangePickerIcon } from '@/assets/icons';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

const RHFDateRangePicker = (props: any) => {
  const [anchorElDate, setAnchorElDate] = useState<HTMLButtonElement | null>(
    null,
  );
  const handleClickDate = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElDate(event?.currentTarget);
  };

  const handleCloseDate = () => {
    setAnchorElDate(null);
  };

  const openDate = Boolean(anchorElDate);
  const idDate = openDate ? 'simple-popover' : undefined;

  const { name, label, required, ...other } = props;
  const { control, setValue } = useFormContext();

  const handleClear = () => {
    setValue(name, null);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const { startDate, endDate } = field?.value || {};

        const displayValue =
          startDate && endDate
            ? `${dayjs(startDate)?.format(DATE_FORMAT?.UI)} - ${dayjs(
                endDate,
              )?.format(DATE_FORMAT?.UI)}`
            : '';

        return (
          <>
            {label && <CustomLabel label={label} required={required} />}
            <TextField
              fullWidth
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
              value={displayValue}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    {displayValue && (
                      <IconButton onClick={handleClear} size="small">
                        <ClearIcon />
                      </IconButton>
                    )}
                    <Box
                      sx={{ cursor: 'pointer' }}
                      onClick={(e: any) => handleClickDate?.(e)}
                    >
                      <DateRangePickerIcon />
                    </Box>
                  </InputAdornment>
                ),
              }}
              {...other}
              label=""
            />
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
              <DateRange
                {...field}
                {...other}
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                ranges={[field?.value]}
                onChange={(item: any) => setValue(name, item?.selection)}
              />
            </Popover>
          </>
        );
      }}
    />
  );
};

export default RHFDateRangePicker;
