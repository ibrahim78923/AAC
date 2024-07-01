import { Box, Checkbox, Divider, Grid, Typography } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { useTimeSlotsWeekly } from './useTimeSlotsWeekly';
import { TimeSlot } from './TimeSlot';
import dayjs from 'dayjs';
import { TIME_FORMAT } from '@/constants';

const TimeSlotsWeekly = (props: any) => {
  const {
    disabled,
    theme,
    setValue,
    watch,
    daySlotsState,
    setDaySlotsState,
    control,
    timeSlotsData,
  }: any = props;

  const { fields }: any = useTimeSlotsWeekly(props);

  return (
    <>
      <Typography variant="h3">Weekly Hours</Typography>
      {!disabled ? (
        <Box
          border={`1.5px solid ${theme?.palette?.custom?.border_grayish_blue}`}
          borderRadius={3}
          mt={1}
        >
          {fields?.map((dayField: any, dayIndex: number) => {
            const watchTimeRange = watch(
              `daysTimeRanges.${dayIndex}.timeRanges`,
            );
            return (
              <Grid
                container
                key={dayField?.days}
                py={1.5}
                gap={1}
                alignItems={'center'}
                flexWrap={'wrap'}
              >
                <Grid
                  item
                  xs={2}
                  display={'flex'}
                  alignItems={'center'}
                  gap={1}
                >
                  <Checkbox
                    icon={<CheckboxIcon />}
                    checkedIcon={<CheckboxCheckedIcon />}
                    checked={watchTimeRange?.length}
                  />
                  <Typography>{dayField?.days?.substring(0, 3)}</Typography>
                </Grid>
                <Grid item xs={12} lg={9}>
                  <TimeSlot
                    parentIndex={dayIndex}
                    watch={watch}
                    setDaySlotsState={setDaySlotsState}
                    daySlotsState={daySlotsState}
                    setValue={setValue}
                    control={control}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Grid>
            );
          })}
        </Box>
      ) : timeSlotsData ? (
        <Box
          border={`1.5px solid ${theme?.palette?.custom?.border_grayish_blue}`}
          borderRadius={3}
          mt={1}
        >
          {timeSlotsData?.daysTimeRanges?.map((dayField: any) => (
            <Grid
              container
              key={dayField?.days}
              py={1.5}
              gap={1}
              alignItems={'center'}
            >
              <Grid item xs={2} width={'100px'} pl={2}>
                <Typography>{dayField?.days?.substring(0, 3)}</Typography>
              </Grid>
              <Grid item lg={7.5} xs={9} textAlign="center" key={dayField?._id}>
                {dayField?.timeRanges?.length ? (
                  dayField?.timeRanges?.map((time: any) => (
                    <Typography key={time?._id}>
                      {`${dayjs(time?.startHour)?.format(
                        TIME_FORMAT?.TH,
                      )} - ${dayjs(time?.endHour)?.format(TIME_FORMAT?.TH)}`}
                    </Typography>
                  ))
                ) : (
                  <Typography>Unavailable</Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          ))}
        </Box>
      ) : (
        <Box
          border={`1.5px solid ${theme?.palette?.custom?.border_grayish_blue}`}
          borderRadius={3}
          mt={1}
        >
          {fields?.map((dayField: any) => (
            <Grid
              container
              key={dayField?.days}
              py={1.5}
              gap={1}
              alignItems={'center'}
            >
              <Grid item xs={2} width={'100px'} pl={2}>
                <Typography>{dayField?.days?.substring(0, 3)}</Typography>
              </Grid>
              {!timeSlotsData ? (
                <Grid item lg={7.5} xs={9} textAlign={'center'}>
                  <Typography>Unavailable</Typography>
                </Grid>
              ) : (
                <>
                  {timeSlotsData?.daysTimeRanges?.map((slots: any) => (
                    <Grid
                      item
                      lg={7.5}
                      xs={9}
                      textAlign="center"
                      key={slots?._id}
                    >
                      {slots?.timeRanges?.map((time: any) => (
                        <Typography key={time?._id}>
                          {`${dayjs(time?.startHour)?.format(
                            TIME_FORMAT?.TH,
                          )} - ${dayjs(time?.endHour)?.format(
                            TIME_FORMAT?.TH,
                          )}`}
                        </Typography>
                      ))}
                    </Grid>
                  ))}
                </>
              )}
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          ))}
        </Box>
      )}
    </>
  );
};

export default TimeSlotsWeekly;
