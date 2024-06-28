import { Box, Checkbox, Divider, Grid, Typography } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { useTimeSlotsWeekly } from './useTimeSlotsWeekly';
import { TimeSlot } from './TimeSlot';

const TimeSlotsWeekly = (props: any) => {
  const {
    disabled,
    theme,
    setValue,
    watch,
    daySlotsState,
    setDaySlotsState,
    control,
  }: any = props;

  const { fields, handleCheckboxChange, isDayChecked }: any =
    useTimeSlotsWeekly(props);

  return (
    <>
      <Typography variant="h3">Weekly Hours</Typography>
      {!disabled ? (
        <Box
          border={`1.5px solid ${theme?.palette?.custom?.border_grayish_blue}`}
          borderRadius={3}
          mt={1}
        >
          {fields?.map((dayField: any, dayIndex: number) => (
            <Grid
              container
              key={dayField?.days}
              py={1.5}
              gap={1}
              alignItems={'center'}
              flexWrap={'wrap'}
            >
              <Grid item xs={2} display={'flex'} alignItems={'center'} gap={1}>
                <Checkbox
                  icon={<CheckboxIcon />}
                  checkedIcon={<CheckboxCheckedIcon />}
                  checked={isDayChecked(dayField?.days)}
                  onChange={() => handleCheckboxChange(dayField?.days)}
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
                  handleCheckboxChange={handleCheckboxChange}
                />
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
              <Grid item lg={7.5} xs={9} textAlign={'center'}>
                <Typography>Unavailable</Typography>
              </Grid>
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
