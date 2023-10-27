import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { contractDrawerFormFields } from './ContractDrawerForm.data';
import { v4 as uuidv4 } from 'uuid';

function ContractDrawerForm({ submitDrawerForm, methods, handleSubmit }: any) {
  return (
    <Box mt={1}>
      <FormProvider methods={methods} onSubmit={handleSubmit(submitDrawerForm)}>
        <Grid container spacing={4}>
          {contractDrawerFormFields?.map((item: any) => (
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

export default ContractDrawerForm;
