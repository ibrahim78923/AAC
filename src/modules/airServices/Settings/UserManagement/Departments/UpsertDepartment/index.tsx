import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import { departmentFormFields } from './UpsertDepartment.data';
import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertDepartment } from './useUpsertDepartment';

export const UpsertDepartment = (props: any) => {
  const { open } = props;
  const {
    handleClose,
    handleSubmit,
    submitUpsertDepartment,
    postDepartmentStatus,
    userList,
    method,
  } = useUpsertDepartment(props);
  return (
    <Dialog open={open} onClose={handleClose}>
      <Box p={2}>
        <DialogTitle>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            gap={1}
          >
            <Typography variant="h4" color="slateBlue.main">
              {'Add Department'}
            </Typography>
            <Box sx={{ cursor: 'pointer' }} onClick={handleClose}>
              <CloseIcon color="secondary" />
            </Box>
          </Box>
        </DialogTitle>
        <FormProvider
          methods={method}
          onSubmit={handleSubmit(submitUpsertDepartment)}
        >
          <DialogContent>
            <Grid container spacing={2}>
              {departmentFormFields(userList, userList)?.map((item: any) => (
                <Grid item key={item?.id} xs={12}>
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.heading ? item?.heading : null}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid item display={'flex'} mt={2} gap={1} justifyContent={'end'}>
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleClose}
                disabled={postDepartmentStatus?.isLoading}
              >
                Cancel
              </Button>
              <LoadingButton
                variant="contained"
                type="submit"
                loading={postDepartmentStatus?.isLoading}
                disabled={postDepartmentStatus?.isLoading}
              >
                Save
              </LoadingButton>
            </Grid>
          </DialogActions>
        </FormProvider>
      </Box>
    </Dialog>
  );
};
