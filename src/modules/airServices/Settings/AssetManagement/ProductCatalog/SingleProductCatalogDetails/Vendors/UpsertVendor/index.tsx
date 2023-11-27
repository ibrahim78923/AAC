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
import { useUpsertVendor } from './useUpsertVendor';
import { upsertVendorDataArray } from './UpsertVendor.data';

export const UpsertAsset = (props: any) => {
  const { isUpsertModalOpen, setIsUpsertModalOpen } = props;

  const { methods, handleSubmit, onSubmit } = useUpsertVendor(
    setIsUpsertModalOpen,
    isUpsertModalOpen,
  );

  return (
    <Dialog
      open={isUpsertModalOpen?.open}
      onClose={() => setIsUpsertModalOpen?.({ open: false, id: '' })}
      fullWidth
    >
      <DialogTitle
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        mb={1}
      >
        <Typography variant={'h3'}>
          {isUpsertModalOpen?.id ? 'Edit' : 'Add'} Vendor
        </Typography>
        <CloseIcon
          sx={{ cursor: 'pointer' }}
          onClick={() => setIsUpsertModalOpen?.({ open: false, id: '' })}
        />
      </DialogTitle>
      <DialogContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {upsertVendorDataArray?.map((item: any) => (
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
                onClick={() => setIsUpsertModalOpen?.({ open: false, id: '' })}
              >
                Cancel
              </Button>
              <Button type={'submit'} variant={'contained'}>
                Save
              </Button>
            </Grid>
          </Grid>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
