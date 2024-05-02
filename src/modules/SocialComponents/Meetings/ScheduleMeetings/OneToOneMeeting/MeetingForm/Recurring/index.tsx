import {
  RHFAutocomplete,
  RHFMultiCheckbox,
  RHFRadioGroup,
  RHFSwitch,
} from '@/components/ReactHookForm';
import { useRecurring } from './useRecurring';
import { Grid } from '@mui/material';
import {
  checkOption,
  dayOption,
  dayTypeOption,
  monthOption,
  monthTypeOption,
  monthWeekOption,
  optionTypes,
  recurringTypeOption,
  weekDayOption,
} from './Recurring.data';

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
              options={recurringTypeOption}
              getOptionDisabled={(option: any) =>
                (option === optionTypes?.weekly && differenceInDays < 7) ||
                (option === optionTypes?.monthly && differenceInDays < 30)
              }
            />
          </Grid>
          {watchRecurringType === optionTypes?.daily && (
            <>
              <Grid item xs={12}>
                <RHFRadioGroup name="dailyType" options={dayTypeOption} />
              </Grid>
              <Grid item xs={6}>
                <RHFAutocomplete
                  name="recurringDay"
                  label="Days"
                  size="small"
                  placeholder="Select Day"
                  options={dayOption}
                  disabled={watchDailyType === optionTypes?.workingDay}
                />
              </Grid>
            </>
          )}
          {watchRecurringType === optionTypes?.weekly && (
            <Grid item xs={12}>
              <RHFMultiCheckbox
                name="weekDays"
                GridView={3}
                options={checkOption}
              />
            </Grid>
          )}
          {watchRecurringType === optionTypes?.monthly && (
            <>
              <Grid item xs={12}>
                <RHFRadioGroup name="monthType" options={monthTypeOption} />
              </Grid>
              {watchMonthType === optionTypes?.onDate && (
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
              {watchMonthType === optionTypes?.onThe && (
                <>
                  <Grid item xs={6}>
                    <RHFAutocomplete
                      name="recurringMonthlyWeek"
                      label="Week"
                      size="small"
                      placeholder="Select Week"
                      options={monthWeekOption}
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
                      options={weekDayOption}
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
