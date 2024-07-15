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
} from './Recurring.data';

export const Recurring = (props: any) => {
  const {
    watchAllDay,
    isSameDate,
    watchRecurring,
    differenceInDays,
    watchType,
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
        <Grid container pt={1.5} spacing={2}>
          <Grid item md={6} xs={12}>
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
              getOptionLabel={(option: any) => option?.label}
            />
          </Grid>
          {watchType === optionTypes?.daily && (
            <>
              <Grid item xs={12}>
                <RHFRadioGroup name="dailyType" options={dayTypeOption} />
              </Grid>
              {watchDailyType === optionTypes?.onThe && (
                <Grid item md={6} xs={12}>
                  <RHFAutocomplete
                    name="recurringDay"
                    label="Days"
                    size="small"
                    required
                    placeholder="Select Day"
                    options={dayOption}
                    getOptionLabel={(option: any) => option}
                  />
                </Grid>
              )}
            </>
          )}
          {watchType === optionTypes?.weekly && (
            <Grid item xs={12}>
              <RHFMultiCheckbox
                name="weekDays"
                GridView={3}
                options={checkOption}
              />
            </Grid>
          )}
          {watchType === optionTypes?.monthly && (
            <>
              <Grid item xs={12}>
                <RHFRadioGroup name="monthType" options={monthTypeOption} />
              </Grid>
              {watchMonthType === optionTypes?.onDate && (
                <Grid item md={6} xs={12}>
                  <RHFAutocomplete
                    name="monthlyDate"
                    label="Date"
                    size="small"
                    placeholder="Select Date"
                    required
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
                  <Grid item sm={6} xs={12}>
                    <RHFAutocomplete
                      name="monthlyWeeks"
                      label="Week"
                      size="small"
                      placeholder="Select Week"
                      required
                      options={monthWeekOption}
                      multiple
                      isOptionEqualToValue={(option: any, newValue: any) =>
                        option === newValue
                      }
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <RHFAutocomplete
                      name="monthlyDays"
                      label="Days"
                      size="small"
                      options={checkOption}
                      getOptionLabel={(item: any) => item?.label}
                      required
                      multiple
                      placeholder="Select Day"
                      isOptionEqualToValue={(option: any, newValue: any) =>
                        option === newValue
                      }
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
