import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { createTicketDataArray } from './CreateTicket.data';
import { v4 as uuidv4 } from 'uuid';

function CreateTicket({ submitCreateNewTicket, methods, handleSubmit }: any) {
  return (
    <Box mt={1}>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(submitCreateNewTicket)}
      >
        <Grid container spacing={4}>
          {createTicketDataArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              <item.component {...item.componentProps} size={'small'}>
                {item?.componentProps?.select
                  ? item?.options?.map((option: any) => (
                      <option key={option?.value} value={option?.value}>
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
}

export default CreateTicket;
