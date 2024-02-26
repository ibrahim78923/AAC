import { Box, Button, Dialog, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import { departmentFormFields } from './DepartmentsFormModal.data';
import { FormProvider } from '@/components/ReactHookForm';

export const DepartmentsFormModal = (props: any) => {
  const {
    methods,
    handleSubmit,
    open,
    handleClose,
    formTitle,
    userList,
    isLoading,
  } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
          <Box sx={{ cursor: 'pointer' }} onClick={handleClose}>
            <CloseIcon color="secondary" />
          </Box>
        </Box>
        <FormProvider
          style={{ marginTop: '1.5rem' }}
          methods={methods}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            {departmentFormFields(userList, userList)?.map((item: any) => (
              <Grid item key={item?.id} xs={12}>
                {item?.heading ? (
                  <item.component {...item?.componentProps}>
                    {item?.heading}
                  </item.component>
                ) : (
                  <item.component {...item?.componentProps} size={'small'} />
                )}
              </Grid>
            ))}
          </Grid>
          <Grid item display={'flex'} mt={2} gap={1} justifyContent={'end'}>
            <Button variant="outlined" color="inherit" onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              type="submit"
              loading={isLoading}
            >
              Save
            </LoadingButton>
          </Grid>
        </FormProvider>
      </Box>
    </Dialog>
  );
};
