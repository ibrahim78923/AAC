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
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import useParagraphText from './useParagraphText';

export default function ParagraphText({
  open,
  setOpen,
  form,
  setForm,
  editId,
}: any) {
  const { methods, handleSubmit, onSubmit } = useParagraphText({
    setOpen,
    form,
    setForm,
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
            <FormatListBulletedIcon
              sx={{ color: 'primary.main' }}
              fontSize={'large'}
            />
          </Box>
          <Typography variant={'h5'}>
            Field Properties - Paragraph Text
          </Typography>
        </Box>
      </DialogTitle>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant={'h5'}>Behavior</Typography>
              <RHFCheckbox name={'required'} label={'Mandatory Field'} />

              <Divider sx={{ my: 1 }} />
            </Grid>

            <Grid item xs={12}>
              <RHFTextField
                name={'name'}
                label={'Field Name'}
                placeholder={'Field Name'}
                size={'small'}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <RHFTextField
                name={'placeholder'}
                label={'Placeholder Text'}
                placeholder={'Placeholder Text'}
                size={'small'}
                multiline
                rows={4}
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
