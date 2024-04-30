import {
  RHFAutocomplete,
  RHFMultiCheckbox,
  RHFRadioGroup,
  RHFSwitch,
} from '@/components/ReactHookForm';
import { useRecurring } from './useRecurring';
import { Grid } from '@mui/material';

export const Recurring = (props: any) => {
  const {
    watchAllDay,
    isSameDate,
    watchRecurring,
    differenceInDays,
    watchRecurringType,
    watchDailyType,
    watchMonthType,
  } = useRecurring(props);
  const checkOption = [
    { label: 'Sunday', value: 'sunday' },
    { label: 'Monday', value: 'monday' },
    { label: 'Tuesday', value: 'tuesday' },
    { label: 'Wednesday', value: 'wednesday' },
    { label: 'Thursday', value: 'Thursday' },
    { label: 'Friday', value: 'Friday' },
    { label: 'Saturday', value: 'saturday' },
  ];
  const monthOption = Array?.from(
    { length: 30 },
    (_, index) => (index + 1)?.toString(),
  );
  monthOption?.push('Last Day of Month');
  return (
    <>
      <RHFSwitch
        name="recurring"
        label="Recurring"
        disabled={watchAllDay || isSameDate}
      />
      {watchRecurring && (
        <Grid container pt={1} spacing={2}>
          <Grid item xs={6}>
            <RHFAutocomplete
              name="recurringType"
              label="Type"
              size="small"
              placeholder="Select"
              required
              options={['Daily', 'Weekly', 'Monthly']}
              getOptionDisabled={(option: any) =>
                (option === 'Weekly' && differenceInDays < 7) ||
                (option === 'Monthly' && differenceInDays < 30)
              }
            />
          </Grid>
          {watchRecurringType === 'Daily' && (
            <>
              <Grid item xs={12}>
                <RHFRadioGroup
                  name="dailyType"
                  options={[
                    { label: 'Every', value: 'everyDay' },
                    {
                      label: 'Every weekly(Only Working Days)',
                      value: 'workingDay',
                    },
                  ]}
                />
              </Grid>
              <Grid item xs={6}>
                <RHFAutocomplete
                  name="recurringDay"
                  label="Days"
                  size="small"
                  placeholder="Select Day"
                  options={['1', '2', '3', '4', '5', '6', '7']}
                  disabled={watchDailyType === 'workingDay'}
                />
              </Grid>
            </>
          )}
          {watchRecurringType === 'Weekly' && (
            <Grid item xs={12}>
              <RHFMultiCheckbox
                name="weekDays"
                GridView={3}
                options={checkOption}
              />
            </Grid>
          )}
          {watchRecurringType === 'Monthly' && (
            <>
              <Grid item xs={12}>
                <RHFRadioGroup
                  name="monthType"
                  options={[
                    { label: 'On Date', value: 'onDate' },
                    { label: 'On The', value: 'onThe' },
                  ]}
                />
              </Grid>
              {watchMonthType === 'onDate' && (
                <Grid item xs={6}>
                  <RHFAutocomplete
                    name="recurringMonthlyDate"
                    label="Date"
                    size="small"
                    placeholder="Select Date"
                    options={monthOption}
                    multiple
                    isOptionEqualToValue={(option: any, newValue: any) =>
                      option === newValue
                    }
                  />
                </Grid>
              )}
              {watchMonthType === 'onThe' && (
                <>
                  <Grid item xs={6}>
                    <RHFAutocomplete
                      name="recurringMonthlyWeek"
                      label="Week"
                      size="small"
                      placeholder="Select Week"
                      options={['First', 'Second', 'Third', 'Fourth', 'Last']}
                      multiple
                      isOptionEqualToValue={(option: any, newValue: any) =>
                        option === newValue
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <RHFAutocomplete
                      name="recurringMonthlyDay"
                      label="Days"
                      size="small"
                      placeholder="Select Day"
                      options={[
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                        'Sunday',
                      ]}
                    />
                  </Grid>
                </>
              )}
            </>
          )}
        </Grid>
      )}
    </>
  );
};
