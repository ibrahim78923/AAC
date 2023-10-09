import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { DrawerFormDataArray } from './DrawerForm.data';
import { v4 as uuidv4 } from 'uuid';

function DrawerForm({ submitDrawerForm, methods, handleSubmit }: any) {
  return (
    <Box mt={1}>
      <FormProvider methods={methods} onSubmit={handleSubmit(submitDrawerForm)}>
        <Grid container spacing={4}>
          {DrawerFormDataArray?.map((item: any) => (
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

export default DrawerForm;
