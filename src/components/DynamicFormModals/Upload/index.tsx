import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import {
  FormProvider,
  RHFCheckbox,
  RHFTextField,
} from '@/components/ReactHookForm';
import useUpload from './useUpload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function Upload({ open, setOpen, form, setForm, editId }: any) {
  const { methods, handleSubmit, onSubmit } = useUpload({
    setOpen,
    setForm,
    form,
    editId,
  });

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth={'sm'}
      fullWidth
    >
      <DialogTitle variant={'h3'}>
        <Box display={'flex'} gap={1} alignItems={'center'}>
          <Box bgcolor={'primary.lighter'} px={1} pt={1} borderRadius={2}>
            <CloudUploadIcon
              sx={{ color: 'primary.main' }}
              fontSize={'large'}
            />
          </Box>
          <Typography variant={'h5'}>Field Properties - Upload</Typography>
        </Box>
      </DialogTitle>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant={'h5'}>Behavior</Typography>
              <RHFCheckbox name={'required'} label={'Mandatory Field'} />

              <Divider sx={{ my: 1 }} />
            </Grid>

            <Grid item xs={12}>
              <RHFTextField
                name={'name'}
                label={'Enter Field Name'}
                placeholder={'Name'}
                size={'small'}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <RHFTextField
                name={'placeholder'}
                label={'Placeholder Text'}
                placeholder={'PNG, JPG, PDF, DOC, and CSV (max 2.44 MB)'}
                size={'small'}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 2.4, pb: 1.6 }}>
          <Button
            type={'button'}
            variant={'outlined'}
            color={'inherit'}
            className={'small'}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button type={'submit'} variant={'contained'} className={'small'}>
            Save
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
