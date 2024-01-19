import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { AlertModalCloseIcon } from '@/assets/icons';
import { useUpsertProduct } from './useUpsertProduct';
import { LoadingButton } from '@mui/lab';

export const UpsertProduct = (props: any) => {
  const { upsertProductModal, setUpsertProductModal, editData, setEditData } =
    props;
  const {
    methods,
    handleSubmit,
    isSubmit,
    editSubmit,
    handleCancel,
    isLoading,
    isEditLoading,
    upsertProductFields,
  } = useUpsertProduct(props);

  return (
    <>
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
              {editData?._id ? 'Update Product' : 'Add Product'}
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
              {upsertProductFields?.map((item: any) => (
                <Grid
                  item
                  xs={12}
                  lg={item?.gridLength}
                  flex={1}
                  key={item?.id}
                >
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
            <LoadingButton
              disabled={editData?._id ? isEditLoading : isLoading}
              variant="outlined"
              color="secondary"
              onClick={handleCancel}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              type="submit"
              variant="contained"
              disabled={isLoading}
              onClick={
                editData?._id
                  ? handleSubmit(editSubmit)
                  : handleSubmit(isSubmit)
              }
            >
              {editData?._id ? 'Update' : 'Save'}
            </LoadingButton>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};
