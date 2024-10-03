import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FormProvider } from '@/components/ReactHookForm';
import { AssetFieldFormDataArray } from '../AssetType.data';
import { LoadingButton } from '@mui/lab';
import useParentType from './useParentType';

export default function ParentType({ parentDetails, setParentDetails }: any) {
  const {
    onClose,
    methods,
    handleSubmit,
    onSubmit,
    postAssetTypeStatus,
    patchAssetTypeStatus,
  } = useParentType({ parentDetails, setParentDetails });

  return (
    <Dialog
      open={parentDetails?.open}
      onClose={onClose}
      maxWidth={'sm'}
      fullWidth
    >
      <DialogTitle
        variant={'h3'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography variant={'h5'} component={'span'}>
          {parentDetails?.parentData ? 'Edit Asset Type' : 'Add Asset Type'}
        </Typography>

        <CloseIcon onClick={onClose} sx={{ cursor: 'pointer' }} />
      </DialogTitle>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={1}>
            {AssetFieldFormDataArray?.map((item: any) => (
              <Grid item xs={12} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            type={'button'}
            variant={'outlined'}
            color={'inherit'}
            onClick={onClose}
            className="small"
            disabled={
              postAssetTypeStatus?.isLoading || patchAssetTypeStatus?.isLoading
            }
          >
            Cancel
          </Button>
          <LoadingButton
            type={'submit'}
            variant={'contained'}
            className="small"
            disabled={
              postAssetTypeStatus?.isLoading || patchAssetTypeStatus?.isLoading
            }
            loading={
              postAssetTypeStatus?.isLoading || patchAssetTypeStatus?.isLoading
            }
          >
            {parentDetails?.parentData ? 'Update' : 'Save'}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
