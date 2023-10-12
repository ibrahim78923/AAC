import React from 'react';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Button, Grid, Typography } from '@mui/material';
import { newPurchaseFields } from './NewPurchaseOrder.data';
import useNewPurchaseOrder from './useNewPurchaseOrder';
import ItemsDetails from './ItemsDetails';
const NewParchaseOrder = () => {
  const { methods, submit } = useNewPurchaseOrder();
  return (
    <>
      <FormProvider methods={methods} onSubmit={methods?.handleSubmit(submit)}>
        <Typography variant="h5">Purchase Details</Typography>
        <Grid container>
          <Grid
            item
            xs={12}
            lg={9}
            container
            rowSpacing={1.8}
            columnSpacing={3}
            mt={-1}
          >
            {newPurchaseFields?.map((form: any) => {
              return (
                <Grid item xs={12} md={form?.gridLength} key={form.id}>
                  <form.component {...form.componentProps} size="small">
                    {form?.componentProps?.select
                      ? form.componentProps.options.map((option: any) => (
                          <option key={option?.id} value={option?.value}>
                            {option?.label}
                          </option>
                        ))
                      : form?.heading
                      ? form?.heading
                      : null}
                  </form.component>
                </Grid>
              );
            })}
          </Grid>
          {
            <Grid
              item
              xs={12}
              container
              rowSpacing={2.6}
              columnSpacing={2}
              mt={-1}
            >
              <Box sx={{ width: '100%' }}>
                <Typography variant="h5">Items Details</Typography>
                <ItemsDetails />
              </Box>
            </Grid>
          }
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button onClick={() => methods.reset()} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </FormProvider>
    </>
  );
};

export default NewParchaseOrder;
