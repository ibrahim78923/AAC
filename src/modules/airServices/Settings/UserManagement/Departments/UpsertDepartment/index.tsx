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
  const { openUpsertModal, selectedDepartment } = props;
  const {
    handleClose,
    handleSubmit,
    submitUpsertDepartment,
    postDepartmentStatus,
    userList,
    method,
    updateDepartmentStatus,
  } = useUpsertDepartment(props);
  return (
    <Dialog
      open={openUpsertModal}
      onClose={handleClose}
      maxWidth={'sm'}
      fullWidth
    >
      <DialogTitle>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={1}
        >
          <Typography variant="h4" color="slateBlue.main">
            {!!selectedDepartment?._id ? 'Edit Department' : 'Add Department'}
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
          <Grid container spacing={1}>
            {departmentFormFields(userList, userList)?.map((item: any) => (
              <Grid item key={item?.id} xs={12}>
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.heading ? item?.heading : null}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ paddingTop: `0.5rem !important` }}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleClose}
            disabled={
              postDepartmentStatus?.isLoading ||
              updateDepartmentStatus?.isLoading
            }
          >
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={
              postDepartmentStatus?.isLoading ||
              updateDepartmentStatus?.isLoading
            }
            disabled={
              postDepartmentStatus?.isLoading ||
              updateDepartmentStatus?.isLoading
            }
          >
            Save
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
