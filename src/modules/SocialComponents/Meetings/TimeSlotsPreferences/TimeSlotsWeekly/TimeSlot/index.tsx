import { RHFTimePicker } from '@/components/ReactHookForm';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Delete } from '@mui/icons-material';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Permissions } from '@/constants/permissions';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { CopyIconButton } from '@/assets/icons';
import { timeSlotsWeeklyDropdown } from '../TimeSlotWeekly.data';

export const TimeSlot = ({
  parentIndex,
  watch,
  setValue,
  daySlotsState,
  setDaySlotsState,
  control,
}: any) => {
  const { remove, append } = useFieldArray({
    name: `daysTimeRanges.${parentIndex}.timeRanges`,
    control,
  });
  const watchTimeRange = watch(`daysTimeRanges.${parentIndex}.timeRanges`);
  const handleAppend = () => {
    append({ startHour: new Date(), endHour: new Date() });
  };
  const { getValues } = useFormContext();
  const incomeBaseFields = getValues(
    `daysTimeRanges.${parentIndex}.timeRanges`,
  );

  return (
    <Box display="flex" flexDirection="row-reverse" alignItems="end">
      <IconButton onClick={handleAppend}>
        <AddCircleIcon />
      </IconButton>
      <Grid container spacing={1} pt={1} alignItems={'center'}>
        {!watchTimeRange?.length ? (
          <Grid item lg={10} xs={9} textAlign={'center'} pb={0.5}>
            <Typography>Unavailable</Typography>
          </Grid>
        ) : (
          <>
            {incomeBaseFields?.map((field: any, index: number) => {
              const startHour = watch(
                `daysTimeRanges.${parentIndex}.timeRanges.${index}.startHour`,
              );
              const endHour = watch(
                `daysTimeRanges.${parentIndex}.timeRanges.${index}.endHour`,
              );
              return (
                <Grid
                  container
                  key={field?.id}
                  gap={1}
                  justifyContent={'center'}
                  alignItems={'center'}
                  sx={{ pl: { xs: 2, md: 0 } }}
                >
                  <Grid item md={4} xs={12}>
                    <RHFTimePicker
                      name={`daysTimeRanges.${parentIndex}.timeRanges.${index}.startHour`}
                      size="small"
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <RHFTimePicker
                      name={`daysTimeRanges.${parentIndex}.timeRanges.${index}.endHour`}
                      size="small"
                    />
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <IconButton onClick={() => remove(index)}>
                      <Delete />
                    </IconButton>
                    <PermissionsGuard
                      permissions={Permissions?.SOCIAL_COMPONENTS_EMAIL}
                    >
                      <SingleDropdownButton
                        dropdownOptions={timeSlotsWeeklyDropdown({
                          startHour,
                          endHour,
                          setValue,
                          daySlotsState,
                          setDaySlotsState,
                          index,
                        })}
                        dropdownName={<CopyIconButton />}
                        hasEndIcon={false}
                        btnVariant="text"
                      />
                    </PermissionsGuard>
                  </Grid>
                </Grid>
              );
            })}
          </>
        )}
      </Grid>
    </Box>
  );
};
