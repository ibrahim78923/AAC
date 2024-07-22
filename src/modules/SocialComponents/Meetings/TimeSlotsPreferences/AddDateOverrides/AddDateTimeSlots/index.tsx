import { RHFTimePicker } from '@/components/ReactHookForm';
import { Divider, Grid, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Delete } from '@mui/icons-material';
import { useFieldArray } from 'react-hook-form';

export const AddDateTimeSlots = ({ parentIndex, control }: any) => {
  const { fields, remove, append } = useFieldArray({
    name: `dateOverrides.${parentIndex}.timeRanges`,
    control,
  });

  const addDateOverride = () => {
    append({ startHour: new Date(), endHour: new Date() });
  };

  return (
    <>
      <Grid
        container
        mt={1}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        {fields?.map((field: any, index: number) => (
          <Grid item xs={10} key={field?.id} display={'flex'} gap={0.5}>
            <RHFTimePicker
              name={`dateOverrides.${parentIndex}.timeRanges.${index}.startHour`}
            />
            <RHFTimePicker
              name={`dateOverrides.${parentIndex}.timeRanges.${index}.endHour`}
            />
            {fields?.length > 1 && (
              <IconButton onClick={() => remove(index)}>
                <Delete />
              </IconButton>
            )}
          </Grid>
        ))}
        <IconButton onClick={addDateOverride}>
          <AddCircleIcon />
        </IconButton>
        <Grid item xs={12} py={0.5}>
          <Divider />
        </Grid>
      </Grid>
    </>
  );
};
