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
import { validationSchema, defaultValues } from './ApproveForm.data';

export const ApproveForm = ({ approveDialog, setApproveDialog }: any) => {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('Approved Successfully!', {
      variant: 'success',
    });
    setApproveDialog(false);
    reset(defaultValues);
  };

  return (
    <Dialog
      open={approveDialog}
      onClose={() => setApproveDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>
        <Grid container justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant="h4">Approved</Typography>
          <CloseIcon
            sx={{ color: 'custom.darker', cursor: 'pointer' }}
            onClick={() => setApproveDialog(false)}
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
                label="Reason For Approval"
              />
            </Grid>

            <Grid item xs={12} textAlign={'end'}>
              <Button
                variant="outlined"
                sx={{ mx: 2 }}
                onClick={() => setApproveDialog(false)}
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
