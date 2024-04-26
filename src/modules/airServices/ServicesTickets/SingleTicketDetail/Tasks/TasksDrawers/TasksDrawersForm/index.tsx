import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { taskTicketFormFields } from './TasksDrawersForm.data';

export const TasksDrawersForm = ({
  methods,
  handleSubmit,
  departmentDropdown,
  userDropdown,
}: any) => {
  return (
    <Box mt={1}>
      <FormProvider methods={methods} onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          {taskTicketFormFields(departmentDropdown, userDropdown)?.map(
            (item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ),
          )}
        </Grid>
      </FormProvider>
    </Box>
  );
};
