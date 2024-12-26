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
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement } from 'react';
import { Attachments } from '@/components/Attachments';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { IDepartmentsProps } from '../Departments.interface';
import { departmentFormFieldsDynamic } from './UpsertDepartment.data';

export const UpsertDepartment = (props: IDepartmentsProps) => {
  const { openUpsertModal, selectedDepartment } = props;
  const {
    handleClose,
    handleSubmit,
    submitUpsertDepartment,
    postDepartmentStatus,
    methods,
    updateDepartmentStatus,
    form,
    getDynamicFieldsStatus,
    postAttachmentStatus,
  } = useUpsertDepartment(props);

  return (
    <Dialog
      open={openUpsertModal as boolean}
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
      <DialogContent>
        {getDynamicFieldsStatus?.isLoading ||
        getDynamicFieldsStatus?.isFetching ? (
          <SkeletonForm />
        ) : getDynamicFieldsStatus?.isError ? (
          <ApiErrorState />
        ) : (
          <FormProvider methods={methods}>
            <Grid container spacing={1}>
              {departmentFormFieldsDynamic?.map((item: any) => (
                <Grid item key={item?.id} xs={12}>
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.heading ? item?.heading : null}
                  </item.component>
                </Grid>
              ))}
              {!!selectedDepartment?._id && (
                <Grid item xs={12}>
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
                </Grid>
              )}
              {form?.map((item: any) => (
                <Grid item xs={12} key={item?.id}>
                  {componentMap[item?.component] &&
                    createElement(componentMap[item?.component], {
                      ...item?.componentProps,
                      name: item?.componentProps?.label,
                      size: 'small',
                    })}
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        )}
      </DialogContent>
      <DialogActions sx={{ paddingTop: `0.5rem !important` }}>
        <Button
          variant="outlined"
          color="inherit"
          className="small"
          onClick={handleClose}
          disabled={
            postDepartmentStatus?.isLoading ||
            updateDepartmentStatus?.isLoading ||
            postAttachmentStatus?.isLoading
          }
        >
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          onClick={handleSubmit(submitUpsertDepartment)}
          className="small"
          loading={
            postDepartmentStatus?.isLoading ||
            updateDepartmentStatus?.isLoading ||
            postAttachmentStatus?.isLoading
          }
          disabled={
            postDepartmentStatus?.isLoading ||
            updateDepartmentStatus?.isLoading ||
            postAttachmentStatus?.isLoading
          }
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
