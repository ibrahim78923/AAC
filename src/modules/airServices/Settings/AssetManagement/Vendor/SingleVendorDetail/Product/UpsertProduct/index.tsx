import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { upsertProductDataArray } from './UpsertProduct.data';
import { AlertModalCloseIcon } from '@/assets/icons';
import { useUpsertProduct } from './useUpsertProduct';

export const UpsertProduct = (props: any) => {
  const { upsertProductModal, setUpsertProductModal, editData, setEditData } =
    props;
  const { methods, handleSubmit, isSubmit, editSubmit, handleCancel } =
    useUpsertProduct(props);

  return (
    <Dialog
      open={upsertProductModal}
      onClose={() => setUpsertProductModal(false)}
    >
      <DialogTitle>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          paddingBottom={'1rem'}
        >
          <Typography variant="h5">
            {editData?._id ? 'Edit Product' : 'Add Product'}
          </Typography>
          <AlertModalCloseIcon
            onClick={() => {
              setUpsertProductModal(false);
              setEditData([]);
            }}
            sx={{ cursor: 'pointer' }}
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {upsertProductDataArray?.map((item: any) => (
              <Grid item xs={12} lg={item?.gridLength} flex={1} key={item?.id}>
                <item.component {...item?.componentProps} />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </DialogContent>
      <DialogActions sx={{ height: '2rem' }}>
        <Box
          display={'flex'}
          justifyContent={'flex-end'}
          marginBottom={'2rem'}
          gap={'1rem'}
        >
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={
              editData?._id ? handleSubmit(editSubmit) : handleSubmit(isSubmit)
            }
          >
            Save
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
