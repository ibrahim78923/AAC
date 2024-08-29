import { Controller, useFormContext } from 'react-hook-form';
import CustomLabel from '../CustomLabel';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {
  Box,
  Button,
  InputAdornment,
  Popover,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { DateRangePickerIcon } from '@/assets/icons';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import CloseIcon from '@mui/icons-material/Close';
import { pxToRem } from '@/utils/getFontValue';

const RHFDateRangePicker = (props: any) => {
  const {
    name,
    label,
    labelProps,
    required,
    hasButton = false,
    onSubmitBtnClick,
    cancelBtnEffect,
    closePopOver,
    ...other
  } = props;

  const [anchorElDate, setAnchorElDate] = useState<HTMLButtonElement | null>(
    null,
  );
  const handleClickDate = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (other?.disabled) return;
    setAnchorElDate(event?.currentTarget);
  };

  const handleCloseDate = () => {
    if (hasButton) {
      closePopOver?.();
    }
    setAnchorElDate(null);
  };

  const openDate = Boolean(anchorElDate);
  const idDate = openDate ? 'simple-popover' : undefined;

  const { control, setValue } = useFormContext();

  const handleClear = () => {
    setValue(name, {
      startDate: null,
      endDate: null,
      key: 'selection',
    });
    cancelBtnEffect?.();
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
            {label && (
              <CustomLabel label={label} required={required} {...labelProps} />
            )}
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
                      <CloseIcon
                        sx={{
                          color: 'custom.darker',
                          cursor: 'pointer',
                          fontSize: pxToRem(20),
                        }}
                        onClick={() => handleClear?.()}
                      />
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
              {hasButton && (
                <Box textAlign={'right'} mb={2} px={2}>
                  <Button
                    variant="contained"
                    onClick={() => onSubmitBtnClick?.(setAnchorElDate)}
                  >
                    Submit
                  </Button>
                </Box>
              )}
            </Popover>
          </>
        );
      }}
    />
  );
};

export default RHFDateRangePicker;
