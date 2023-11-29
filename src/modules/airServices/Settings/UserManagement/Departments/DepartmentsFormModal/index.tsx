import { Box, Button, Dialog, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import { departmentFormFields } from './DepartmentsFormModal.data';
import { FormProvider } from '@/components/ReactHookForm';

export const DepartmentsFormModal = (props: any) => {
  const { methods, handleSubmit, submitForm, open, handleClose, formTitle } =
    props;
  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: '500px',
          },
        },
      }}
    >
      <Box p={2}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h4">{formTitle}</Typography>
          </Box>
          <Box sx={{ cursor: 'pointer' }} onClick={() => handleClose(false)}>
            <CloseIcon color="secondary" />
          </Box>
        </Box>
        <FormProvider
          style={{ marginTop: '1.5rem' }}
          methods={methods}
          onSubmit={handleSubmit(submitForm)}
        >
          <Grid container spacing={2}>
            {departmentFormFields?.map((item: any) => (
              <Grid item key={item?.id} xs={12}>
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.componentProps?.options
                    ? item?.componentProps?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))
                    : item?.heading
                    ? item?.heading
                    : null}
                </item.component>
              </Grid>
            ))}
          </Grid>
          <Grid item display={'flex'} mt={2} gap={1} justifyContent={'end'}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleClose(false)}
            >
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              onClick={() => {
                handleSubmit(submitForm)();
              }}
            >
              Save
            </LoadingButton>
          </Grid>
        </FormProvider>
      </Box>
    </Dialog>
  );
};
