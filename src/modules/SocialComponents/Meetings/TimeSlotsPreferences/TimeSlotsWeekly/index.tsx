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

const TimeSlotsWeekly = ({ disabled, theme, setValue, watch }: any) => {
  const {
    fields,
    remove,
    fieldsAdded,
    timeSlotsState,
    setTimeSlotsState,
    handleAddTimeSlot,
  } = useTimeSlotsWeekly();
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
              key={slot?._id}
              py={1.5}
              gap={1}
              alignItems={'center'}
              flexWrap={'wrap'}
            >
              <Grid item xs={2} display={'flex'} alignItems={'center'} gap={1}>
                <Checkbox
                  icon={<CheckboxIcon />}
                  checkedIcon={<CheckboxCheckedIcon />}
                />
                <Typography>{slot?.day}</Typography>
              </Grid>
              {fieldsAdded?.has(index) ? (
                <Grid item xs={12} lg={7.5}>
                  {fields
                    ?.filter((item: any) => item?.dayIndex === index)
                    ?.map((item: any, dayIndex: number) => {
                      const watchStart = watch(
                        `timeSlot[${index}].slots[${dayIndex}].start`,
                      );
                      const watchEnd = watch(
                        `timeSlot[${index}].slots[${dayIndex}].end`,
                      );
                      const actualIndex = fields?.findIndex(
                        (item: any) =>
                          item?.dayIndex === index && item?.slots[dayIndex],
                      );
                      return (
                        <Grid
                          key={item?._id}
                          display="flex"
                          alignItems="center"
                          gap={1}
                        >
                          <Box display="flex" gap={1} pt={1}>
                            <RHFTimePicker
                              name={`timeSlot[${index}].slots[${dayIndex}].start`}
                              size={'small'}
                            />
                            <RHFTimePicker
                              name={`timeSlot[${index}].slots[${dayIndex}].end`}
                              size={'small'}
                            />
                          </Box>
                          <IconButton onClick={() => remove(actualIndex)}>
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
                                timeSlotsState,
                                setTimeSlotsState,
                                dayIndex,
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
                <IconButton onClick={() => handleAddTimeSlot(index)}>
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
              key={slot?._id}
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
