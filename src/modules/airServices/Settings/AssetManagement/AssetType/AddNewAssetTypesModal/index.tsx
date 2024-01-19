import { AlertModalCloseIcon } from '@/assets/icons';
import { FormProvider } from '@/components/ReactHookForm';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { addNewAssetTypesModalField } from './AddNewAssetTypesModal.data';
import { LoadingButton } from '@mui/lab';

const AddNewAssetTypesModal = (props: any) => {
  const { open, handleClose, methods, modalTitle, handleSubmit, isLoading } =
    props;
  return (
    <>
      <Dialog fullWidth open={open} onClose={() => handleClose?.(false)}>
        <FormProvider methods={methods} onSubmit={handleSubmit}>
          <Box width={'100%'}>
            <DialogTitle>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                mb={1}
              >
                <Typography variant="h4">{modalTitle}</Typography>
                <IconButton
                  onClick={() => handleClose?.(false)}
                  style={{ cursor: 'pointer' }}
                >
                  <AlertModalCloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                {addNewAssetTypesModalField?.map((item: any) => (
                  <Grid item xs={12} md={item?.md} key={item?.id}>
                    <item.component {...item?.componentProps} size={'small'} />
                  </Grid>
                ))}
              </Grid>
              <Divider />
              <Box display={'flex'} justifyContent={'flex-end'} gap={1} pt={1}>
                <LoadingButton
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleClose?.(false)}
                  disabled={isLoading}
                >
                  Close
                </LoadingButton>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  disabled={isLoading}
                >
                  Save
                </LoadingButton>
              </Box>
            </DialogContent>
          </Box>
        </FormProvider>
      </Dialog>
    </>
  );
};

export default AddNewAssetTypesModal;
