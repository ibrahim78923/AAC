import { Box, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertDepartment } from './useUpsertDepartment';
import { Attachments } from '@/components/Attachments';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { IDepartmentsProps } from '../Departments.interface';
import { departmentFormFieldsDynamic } from './UpsertDepartment.data';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { FormGrid } from '@/components/Grids/FormGrid';
import { DynamicForm } from '@/components/DynamicForm';
import { CustomGrid } from '@/components/Grids/CustomGrid';

export const UpsertDepartment = (props: IDepartmentsProps) => {
  const { openUpsertModal, selectedDepartment } = props;
  const {
    handleClose,
    handleSubmit,
    submitUpsertDepartment,
    methods,
    form,
    apiCallInProgress,
    isDynamicFormLoading,
    hasDynamicFormError,
    getDynamicFormData,
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
        <ApiRequestFlow
          showSkeleton={isDynamicFormLoading}
          hasError={hasDynamicFormError}
          refreshApi={getDynamicFormData}
        >
          <FormProvider methods={methods}>
            <FormGrid formFieldsList={departmentFormFieldsDynamic} spacing={1}>
              {!!selectedDepartment?._id && (
                <CustomGrid xs={12}>
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
                  <br />
                </CustomGrid>
              )}
              <DynamicForm dynamicFormFieldsList={form} />
            </FormGrid>
          </FormProvider>
        </ApiRequestFlow>
      </CustomCommonDialog>
    </>
  );
};
