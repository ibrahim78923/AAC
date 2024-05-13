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
import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertDepartment } from './useUpsertDepartment';
import { Attachments } from '@/components/Attachments';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

export const UpsertDepartment = (props: any) => {
  const { openUpsertModal, selectedDepartment } = props;
  const {
    handleClose,
    handleSubmit,
    submitUpsertDepartment,
    postDepartmentStatus,
    method,
    updateDepartmentStatus,
    departmentFormFields,
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
            {departmentFormFields?.map((item: any) => (
              <Grid item key={item?.id} xs={12}>
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.heading ? item?.heading : null}
                </item.component>
              </Grid>
            ))}
          </Grid>
          {!!selectedDepartment?._id && (
            <>
              <Typography
                variant="body1"
                fontWeight={500}
                color="slateBlue.main"
                mb={2}
              >
                {' '}
                Attachments{' '}
              </Typography>
              <Box maxHeight={'20vh'}>
                <Attachments
                  recordId={selectedDepartment?._id}
                  permissionKey={[
                    AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.EDIT_DEPARTMENT,
                  ]}
                  colSpan={{ sm: 12, lg: 12 }}
                />
              </Box>
            </>
          )}
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
