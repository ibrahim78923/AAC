import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FormProvider, RHFAutocomplete } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { validationSchema, defaultValues } from './RequestApprovalForm.data';

export const RequestApprovalForm = ({ openDialog, setOpenDialog }: any) => {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('Approval Requested Successfully!', {
      variant: 'success',
    });
    setOpenDialog(false);
    reset(defaultValues);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>
        <Grid container justifyContent={'space-between'}>
          <Typography variant="h4">Request Approval</Typography>
          <CloseIcon
            sx={{ color: 'custom.darker', cursor: 'pointer' }}
            onClick={() => setOpenDialog(false)}
          />
        </Grid>
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            <Grid item xs={12} key={uuidv4()}>
              <RHFAutocomplete
                name="approvers"
                label="Approvers"
                options={['BE', 'BE1', 'BE2']}
                placeholder={'Select a User'}
                required
              />
            </Grid>

            <Grid item xs={12} textAlign={'end'}>
              <Button
                variant="outlined"
                sx={{ mx: 2 }}
                onClick={() => setOpenDialog(false)}
                color={'secondary'}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Request
              </Button>
            </Grid>
          </Grid>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
