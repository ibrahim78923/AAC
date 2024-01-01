import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FormProvider } from '@/components/ReactHookForm';
import { addAssetDataArray } from './AddAsset.data';
import { useAddAsset } from './useAddAsset';

export const AddAsset = (props: any) => {
  const { addModalOpen, setAddModalOpen } = props;

  const { methods, handleSubmit, onSubmit, postAssociatedAssetStatus } =
    useAddAsset(setAddModalOpen);

  return (
    <Dialog
      open={addModalOpen}
      onClose={() => setAddModalOpen?.(false)}
      fullWidth
    >
      <DialogTitle
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        mb={1}
      >
        <Typography variant={'h3'}>Add Asset</Typography>
        <CloseIcon
          sx={{ cursor: 'pointer' }}
          onClick={() => setAddModalOpen?.(false)}
        />
      </DialogTitle>
      <DialogContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {addAssetDataArray?.map((item: any) => (
              <Grid item xs={12} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
            <Grid item xs={12} textAlign={'end'}>
              <Button
                type={'button'}
                variant={'outlined'}
                color={'secondary'}
                sx={{ mr: 2 }}
                onClick={() => setAddModalOpen?.(false)}
              >
                Cancel
              </Button>
              <Button
                type={'submit'}
                variant={'contained'}
                disabled={postAssociatedAssetStatus?.isLoading}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
