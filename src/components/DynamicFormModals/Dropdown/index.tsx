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
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import useDropdown from './useDropdown';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

export default function Dropdown({
  open,
  setOpen,
  form,
  setForm,
  editId,
}: any) {
  const { methods, handleSubmit, onSubmit, fields, addOption, removeOption } =
    useDropdown({
      setOpen,
      form,
      setForm,
      editId,
    });

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle variant={'h3'}>
        <Box display={'flex'} gap={1} alignItems={'center'}>
          <Box bgcolor={'primary.lighter'} px={1} pt={1} borderRadius={2}>
            <ArrowDropDownCircleIcon
              sx={{ color: 'primary.main' }}
              fontSize={'large'}
            />
          </Box>
          <Typography variant={'h5'}>Field Properties - Dropdown</Typography>
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
              />
            </Grid>

            {fields?.map((count: any, index: number) => (
              <Grid
                item
                xs={12}
                md={6}
                key={count?.id}
                display={'flex'}
                alignItems={'center'}
              >
                <Box>
                  <RHFTextField
                    name={`options[${index}].label`}
                    label={`Option - ${index + 1}`}
                    placeholder={String(index + 1)}
                    size={'small'}
                    required
                  />
                </Box>
                <CancelIcon
                  sx={{
                    cursor: fields?.length > 1 ? 'pointer' : 'no-drop',
                    color: 'error.main',
                    mt: 1.5,
                  }}
                  onClick={() => removeOption?.(index)}
                />
              </Grid>
            ))}

            <Grid item xs={12}>
              <Box
                display={'flex'}
                alignItems={'center'}
                gap={1}
                onClick={addOption}
                sx={{ cursor: 'pointer' }}
                width={'fit-content'}
              >
                <AddCircleIcon
                  sx={{ cursor: 'pointer', color: 'primary.main' }}
                />
                <Typography variant={'h6'} color={'primary.main'}>
                  Add New
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 2.4, pb: 1.6 }}>
          <Button
            type={'button'}
            variant={'outlined'}
            color={'inherit'}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button type={'submit'} variant={'contained'}>
            Save
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
