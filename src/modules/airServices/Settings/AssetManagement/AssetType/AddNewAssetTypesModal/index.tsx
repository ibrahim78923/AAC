import { AlertModalCloseIcon } from '@/assets/icons';
import { FormProvider } from '@/components/ReactHookForm';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { addNewAssetTypesModalField } from './AddNewAssetTypesModal.data';

const AddNewAssetTypesModal = (props: any) => {
  const { open, handleClose, methods, submitForm, modalTitle } = props;
  return (
    <>
      <Dialog fullWidth open={open} onClose={() => handleClose?.(false)}>
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
            <FormProvider
              methods={methods}
              onSubmit={methods?.handleSubmit?.(submitForm)}
            >
              <Grid container spacing={2}>
                {addNewAssetTypesModalField?.map((item: any) => (
                  <Grid item xs={12} md={item?.md} key={item?.id}>
                    <item.component {...item?.componentProps} size={'small'} />
                  </Grid>
                ))}
              </Grid>
            </FormProvider>
            <Divider />
            <Box display={'flex'} justifyContent={'flex-end'} gap={1} pt={1}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleClose?.(false)}
              >
                Close
              </Button>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </Box>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
};

export default AddNewAssetTypesModal;
