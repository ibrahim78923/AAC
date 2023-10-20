import { Box, Button, Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { ArrowLeftIcon } from '@/assets/icons';
import FormBuilder from '@/utils/FormBuilder';
import { newPurchaseFields } from './NewPurchaseOrder.data';
import useNewPurchaseOrder from './useNewPurchaseOrder';
import ItemsDetails from './ItemsDetails';
import { styles } from './NewPurchaseOrder.style';

const NewParchaseOrder = () => {
  const { methods, submit, handlePageBack } = useNewPurchaseOrder();
  const { flexBetween, mainWrapper, mainHeading, subHeading } = styles();

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
              <FormBuilder formFields={newPurchaseFields} />
            </Grid>
            {
              <Grid item xs={12} rowSpacing={2.6} columnSpacing={2}>
                <Box>
                  <Typography sx={{ ...subHeading }}>Items Details</Typography>
                  <ItemsDetails />
                </Box>
              </Grid>
            }
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
              save
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default NewParchaseOrder;
