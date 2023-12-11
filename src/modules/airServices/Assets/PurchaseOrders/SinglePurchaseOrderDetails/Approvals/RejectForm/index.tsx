import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { validationSchema, defaultValues } from './RejectForm.data';

export const RejectForm = ({ rejectDialog, setRejectDialog }: any) => {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('Rejected Successfully!', {
      variant: 'success',
    });
    setRejectDialog(false);
    reset(defaultValues);
  };

  return (
    <Dialog
      open={rejectDialog}
      onClose={() => setRejectDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>
        <Grid container justifyContent={'space-between'}>
          <Typography variant="h4">Rejected</Typography>
          <CloseIcon
            sx={{ color: 'custom.darker', cursor: 'pointer' }}
            onClick={() => setRejectDialog(false)}
          />
        </Grid>
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            <Grid item xs={12} key={uuidv4()}>
              <RHFTextField
                multiline
                rows={3}
                name="reason"
                label="Reason For Rejection"
                required
              />
            </Grid>

            <Grid item xs={12} textAlign={'end'}>
              <Button
                variant="outlined"
                sx={{ mx: 2 }}
                onClick={() => setRejectDialog(false)}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
