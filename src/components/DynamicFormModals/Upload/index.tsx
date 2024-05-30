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
  RHFAutocomplete,
  RHFCheckbox,
  RHFTextField,
} from '@/components/ReactHookForm';
import useUpload from './useUpload';
import { fileTypeAcceptOptions } from './Upload.data';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function Upload({ open, setOpen, form, setForm, editId }: any) {
  const { methods, handleSubmit, onSubmit } = useUpload({
    setOpen,
    setForm,
    form,
    editId,
  });

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
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
                placeholder={'SVG, PNG, JPG or GIF (max 2 MB)'}
                size={'small'}
              />
            </Grid>

            <Grid item xs={12}>
              <RHFAutocomplete
                name={'fileTypeAccept'}
                label={'Allowed Formats'}
                placeholder={'Upload'}
                size={'small'}
                options={fileTypeAcceptOptions}
                getOptionLabel={(option: any) => option?.label}
                required
                multiple
              />
            </Grid>

            <Grid item xs={12}>
              <RHFTextField
                name={'size'}
                label={'Size (MB)'}
                placeholder={'2'}
                size={'small'}
                type={'number'}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 2.4, pb: 1.6 }}>
          <Button type={'submit'} variant={'contained'}>
            Submit
          </Button>
          <Button
            type={'button'}
            variant={'outlined'}
            color={'inherit'}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
