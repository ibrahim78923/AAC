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
import useDate from './useDate';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { DateFormatOptions } from './Date.data';

export default function Date({ open, setOpen, form, setForm, editId }: any) {
  const { methods, handleSubmit, onSubmit } = useDate({
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
            <CalendarMonthIcon
              sx={{ color: 'primary.main' }}
              fontSize={'large'}
            />
          </Box>
          <Typography variant={'h5'}>Field Properties - Date Picker</Typography>
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
              <RHFAutocomplete
                name={'dateFormat'}
                label={'Date Format'}
                placeholder={'Select'}
                size={'small'}
                options={DateFormatOptions}
                getOptionLabel={(option: any) => option?.label}
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
