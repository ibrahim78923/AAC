import { Grid, Typography, Box, Button } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';

import { v4 as uuidv4 } from 'uuid';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'next/router';

import { purchaseOrderActionArray } from './PurchaseOrder.data';
import usePurchaseOrderAction from './usePurchaseOrderAction';
import { ViewDetailBackArrowIcon } from '@/assets/icons';
export const PurchaseOrderEdit = () => {
  const { methods, handleSubmit, onSubmit } = usePurchaseOrderAction();

  const Router = useRouter();
  const submitHandler = methods.handleSubmit(async () => {
    enqueueSnackbar('New Purchase Order Updated successfully', {
      variant: 'success',

      autoHideDuration: 3000,
    });

    Router.push('/air-services/assets/purchase-orders/detail');
  });

  const handleContractClick = () => {
    Router.push('/air-services/assets/purchase-orders/detail');
  };
  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent={'space-between'}
        display={'flex'}
        alignItems={'cente'}
        flexDirection={'row'}
      >
        <Grid
          item
          xs={12}
          sx={{
            border: '1px solid rgba(98, 110, 142, 0.12) ',
            borderRadius: '12px',
            padding: '20px',
          }}
        >
          <div style={{ height: '700px', overflow: 'auto' }}>
            <Box sx={{ mb: '1rem' }}>
              <ViewDetailBackArrowIcon />
              <Typography variant="h5" component="span">
                {'  '}
                New Purchase Order
              </Typography>
            </Box>
            <Box sx={{ mb: '1rem' }}>
              <Typography variant="h6" component="span">
                {'  '}
                Purchase Details
              </Typography>
            </Box>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={4}>
                {purchaseOrderActionArray?.map((item: any) => (
                  <Grid item xs={12} md={item?.md} key={uuidv4()}>
                    <item.component {...item.componentProps} size={'small'}>
                      {item?.componentProps?.select
                        ? item?.options?.map((option: any) => (
                            <option key={option?.value} value={option?.value}>
                              {option?.label}
                            </option>
                          ))
                        : item?.heading
                        ? item?.heading
                        : null}
                    </item.component>
                  </Grid>
                ))}
              </Grid>
            </FormProvider>
          </div>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
          <Box sx={{ mr: '1rem' }}>
            <Button type="submit" onClick={handleContractClick}>
              cancel
            </Button>
          </Box>
          <Box sx={{ ml: '1rem' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={submitHandler}
              type="submit"
            >
              Update
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
