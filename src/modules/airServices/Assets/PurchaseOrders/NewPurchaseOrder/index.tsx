import { Box, Button, Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { ArrowLeftIcon } from '@/assets/icons';
import { newPurchaseFieldsFunction } from './NewPurchaseOrder.data';
import useNewPurchaseOrder from './useNewPurchaseOrder';
import ItemsDetails from './ItemsDetails';
import { styles } from './NewPurchaseOrder.style';
import { v4 as uuidv4 } from 'uuid';

const NewPurchaseOrder = () => {
  const { methods, submit, handlePageBack, vendor, handleVenderSelect } =
    useNewPurchaseOrder();
  const { flexBetween, mainWrapper, mainHeading, subHeading } = styles();
  const newPurchaseFields = newPurchaseFieldsFunction(handleVenderSelect);

  return (
    <Box>
      <Box sx={{ ...mainWrapper }}>
        <Box sx={{ ...flexBetween, display: 'inline-flex', pb: 1.4, gap: 1.4 }}>
          <Box
            onClick={handlePageBack}
            sx={{ ...flexBetween, cursor: 'pointer' }}
          >
            <ArrowLeftIcon />
          </Box>
          <Typography variant="h4" sx={mainHeading}>
            New Purchase Order
          </Typography>
        </Box>
        <FormProvider
          methods={methods}
          onSubmit={methods?.handleSubmit(submit)}
        >
          <Typography sx={{ ...subHeading, pb: 1 }}>
            Purchase Details
          </Typography>
          <Grid container rowSpacing={1.8}>
            <Grid
              item
              xs={12}
              lg={9}
              container
              rowSpacing={1.8}
              columnSpacing={3}
              mt={-1}
            >
              {newPurchaseFields?.map((form: any) => (
                <Grid item xs={12} md={form?.gridLength} key={uuidv4()}>
                  <form.component {...form.componentProps} size="small">
                    {form?.componentProps?.select
                      ? form?.componentProps?.options.map((option: any) => (
                          <option key={uuidv4()} value={option?.value}>
                            {option?.label}
                          </option>
                        ))
                      : null}
                  </form.component>
                </Grid>
              ))}
            </Grid>
            {vendor && (
              <Grid item xs={12} rowSpacing={2.6} columnSpacing={2}>
                <Box>
                  <Typography sx={{ ...subHeading }}>Items Details</Typography>
                  <ItemsDetails />
                </Box>
              </Grid>
            )}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              onClick={() => methods.reset()}
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default NewPurchaseOrder;
