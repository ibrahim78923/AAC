import { Box, Grid } from '@mui/material';
import { RHFTimePicker } from '@/components/ReactHookForm';
import { CopyPrimaryColorIcon, TrashIcon } from '@/assets/icons';
import { useFieldArray } from 'react-hook-form';
import { styles } from './WorkingHoursFieldArray.styles';

export const WorkingHoursFieldArray = ({ control, name }: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
  });

  return (
    <>
      <Box sx={styles?.serviceHoursTimeContainer}>
        {fields?.map((item, index) => (
          <Grid
            key={item?.id}
            container
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={5}>
              <RHFTimePicker name={`${name}.${index}.startTime`} />
            </Grid>
            <Grid item xs={1}>
              to
            </Grid>
            <Grid item xs={5}>
              <RHFTimePicker name={`${name}.${index}.endTime`} />
            </Grid>
            <Grid item xs={1}>
              {index === 0 ? (
                <Box
                  sx={styles?.cursorPointer}
                  onClick={() => append({ startTime: null, endTime: null })}
                >
                  <CopyPrimaryColorIcon />
                </Box>
              ) : (
                <Box sx={styles?.cursorPointer} onClick={() => remove(index)}>
                  <TrashIcon />
                </Box>
              )}
            </Grid>
          </Grid>
        ))}
      </Box>
    </>
  );
};
