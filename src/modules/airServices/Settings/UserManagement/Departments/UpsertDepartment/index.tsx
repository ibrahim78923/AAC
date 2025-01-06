import { Box, Grid, Typography } from '@mui/material';
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
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';

export const UpsertDepartment = (props: IDepartmentsProps) => {
  const { openUpsertModal, selectedDepartment } = props;
  const {
    handleClose,
    handleSubmit,
    submitUpsertDepartment,
    methods,
    form,
    getDynamicFieldsStatus,
    apiCallInProgress,
  } = useUpsertDepartment(props);

  return (
    <>
      <CustomCommonDialog
        isPortalOpen={openUpsertModal}
        closePortal={handleClose}
        dialogTitle={`${
          !!selectedDepartment?._id
            ? GENERIC_UPSERT_FORM_CONSTANT?.EDIT
            : GENERIC_UPSERT_FORM_CONSTANT?.ADD
        } Department`}
        submitButtonText="Save"
        showSubmitLoader={apiCallInProgress}
        disabledCancelButton={apiCallInProgress}
        handleSubmitButton={handleSubmit(submitUpsertDepartment)}
      >
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
      </CustomCommonDialog>
    </>
  );
};
