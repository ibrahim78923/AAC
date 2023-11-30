import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { taskTicketFormFields } from './TasksDrawersForm.data';

export const TasksDrawersForm = ({
  submitTicket,
  methods,
  handleSubmit,
}: any) => {
  return (
    <Box mt={1}>
      <FormProvider methods={methods} onSubmit={handleSubmit(submitTicket)}>
        <Grid container spacing={1}>
          {taskTicketFormFields?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              <item.component {...item?.componentProps} size={'small'}>
                {item?.componentProps?.select
                  ? item?.options?.map((option: any) => (
                      <option key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </option>
                    ))
                  : null}
              </item.component>
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </Box>
  );
};
