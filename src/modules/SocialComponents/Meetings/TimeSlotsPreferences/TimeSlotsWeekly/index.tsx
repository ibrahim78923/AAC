import {
  Box,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  CheckboxCheckedIcon,
  CheckboxIcon,
  CopyIconButton,
} from '@/assets/icons';
import { RHFTimePicker } from '@/components/ReactHookForm';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { useTimeSlotsWeekly } from './useTimeSlotsWeekly';
import {
  timeSlotsWeeklyData,
  timeSlotsWeeklyDropdown,
} from './TimeSlotWeekly.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Permissions } from '@/constants/permissions';

const TimeSlotsWeekly = (props: any) => {
  const {
    disabled,
    theme,
    setValue,
    watch,
    timeSlotsState,
    daySlotsState,
    setDaySlotsState,
  }: any = props;
  const {
    fields,
    handleRemoveTimeSlot,
    fieldsAdded,
    handleAddTimeSlot,
    handleCheckboxChange,
  } = useTimeSlotsWeekly(props);

  return (
    <>
      <Typography variant="h3">Weekly Hours</Typography>
      {disabled === false ? (
        <Box
          border={`1.5px solid ${theme?.palette?.custom?.border_grayish_blue}`}
          borderRadius={3}
          mt={1}
        >
          {timeSlotsWeeklyData?.map((slot: any, index: number) => (
            <Grid
              container
              key={slot?.id}
              py={1.5}
              gap={1}
              alignItems={'center'}
              flexWrap={'wrap'}
            >
              <Grid item xs={2} display={'flex'} alignItems={'center'} gap={1}>
                <Checkbox
                  icon={<CheckboxIcon />}
                  checkedIcon={<CheckboxCheckedIcon />}
                  checked={timeSlotsState?.some(
                    (d: any) => d?.dayName === slot?.day,
                  )}
                  onChange={() => handleCheckboxChange(slot?.day, index)}
                />
                <Typography>{slot?.day}</Typography>
              </Grid>
              {fieldsAdded?.has(index) ? (
                <Grid item xs={12} lg={7.5}>
                  {fields
                    ?.filter((item: any) => item?.dayIndex === index)
                    ?.map((item: any, timeIndex: number) => {
                      const watchStart = watch(
                        `daysTimeRanges[${index}].timeRanges[${timeIndex}].startHour`,
                      );
                      const watchEnd = watch(
                        `daysTimeRanges[${index}].timeRanges[${timeIndex}].endHour`,
                      );
                      const actualIndex = fields?.findIndex(
                        (item: any) =>
                          item?.dayIndex === index &&
                          item?.timeRanges[timeIndex],
                      );
                      return (
                        <Grid
                          key={item.id}
                          display="flex"
                          alignItems="center"
                          gap={1}
                        >
                          <Box display="flex" gap={1} pt={1}>
                            <RHFTimePicker
                              name={`daysTimeRanges[${index}].timeRanges[${timeIndex}].startHour`}
                              size="small"
                            />
                            <RHFTimePicker
                              name={`daysTimeRanges[${index}].timeRanges[${timeIndex}].endHour`}
                              size="small"
                            />
                          </Box>
                          <IconButton
                            onClick={() => handleRemoveTimeSlot(actualIndex)}
                          >
                            <Delete />
                          </IconButton>
                          <PermissionsGuard
                            permissions={Permissions?.SOCIAL_COMPONENTS_EMAIL}
                          >
                            <SingleDropdownButton
                              dropdownOptions={timeSlotsWeeklyDropdown(
                                watchStart,
                                watchEnd,
                                setValue,
                                daySlotsState,
                                setDaySlotsState,
                                timeIndex,
                                handleAddTimeSlot,
                              )}
                              dropdownName={<CopyIconButton />}
                              hasEndIcon={false}
                              btnVariant="text"
                            />
                          </PermissionsGuard>
                        </Grid>
                      );
                    })}
                </Grid>
              ) : (
                <Grid item lg={6} xs={5} textAlign={'center'}>
                  <Typography>Unavailable</Typography>
                </Grid>
              )}
              <Grid item xs={12} md={2}>
                <IconButton onClick={() => handleAddTimeSlot(index, slot?.day)}>
                  <AddCircleIcon />
                </IconButton>
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
          {timeSlotsWeeklyData?.map((slot: any) => (
            <Grid
              container
              key={slot?.id}
              py={1.5}
              gap={1}
              alignItems={'center'}
            >
              <Grid item xs={2} width={'100px'} pl={2}>
                <Typography>{slot?.day}</Typography>
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
