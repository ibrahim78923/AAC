import { Box, Button, Grid } from '@mui/material';
import { useReminder } from './useReminder';
import { reminderFields } from './Reminder.data';
import { AddCircle, Delete } from '@mui/icons-material';

export const Reminder = (props: any) => {
  const { fields, handleAppend, handleRemove } = useReminder(props);
  return (
    <Box mt={-1}>
      {fields?.map((field, index) => (
        <Box key={field?.id} display="flex" alignItems="center" gap={1}>
          <Grid container spacing={2}>
            {reminderFields(index)?.map((item) => (
              <Grid item lg={item?.lg} key={item?.id} mt={1}>
                <item.component {...item?.componentProps} />
              </Grid>
            ))}
          </Grid>
          <Box mt={3.5}>
            <Delete
              sx={{ color: 'error.main', cursor: 'pointer' }}
              onClick={() => handleRemove?.(index)}
            />
          </Box>
        </Box>
      ))}
      <Button
        onClick={handleAppend}
        color="secondary"
        startIcon={<AddCircle color="action" />}
      >
        Add More
      </Button>
    </Box>
  );
};
