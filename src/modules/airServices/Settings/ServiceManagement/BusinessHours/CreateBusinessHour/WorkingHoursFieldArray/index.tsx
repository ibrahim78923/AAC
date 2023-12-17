import { Box, Grid } from '@mui/material';
import { RHFTimePicker } from '@/components/ReactHookForm';
import { CopyPrimaryColorIcon, TrashIcon } from '@/assets/icons';
import { useFieldArray } from 'react-hook-form';

export const WorkingHoursFieldArray = ({ control, name }: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
  });

  return (
    <>
      <Box
        p={{ sm: 2.5, xs: 1 }}
        borderRadius={2}
        border="0.06rem solid"
        borderColor="custom.light_grayish_blue"
        bgcolor="primary.lighter"
        mb={2}
      >
        {fields?.map((item, index) => (
          <Grid
            key={item?.id}
            container
            alignItems="center"
            justifyContent="center"
            spacing={1}
          >
            <Grid item sm={5}>
              <RHFTimePicker name={`${name}.${index}.startTime`} />
            </Grid>
            <Grid item sm={1}>
              to
            </Grid>
            <Grid item sm={5}>
              <RHFTimePicker name={`${name}.${index}.endTime`} />
            </Grid>
            <Grid item xs={1}>
              {index === 0 ? (
                <Box
                  sx={{ cursor: 'pointer' }}
                  onClick={() => append({ startTime: null, endTime: null })}
                >
                  <CopyPrimaryColorIcon />
                </Box>
              ) : (
                <Box sx={{ cursor: 'pointer' }} onClick={() => remove(index)}>
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
