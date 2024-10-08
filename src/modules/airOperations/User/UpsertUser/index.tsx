import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid, Typography } from '@mui/material';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { TITLE_FORM_USER } from './UpsertUser.data';
import { useUpsertUser } from './useUpsertUser';
import ApiErrorState from '@/components/ApiErrorState';
import { OPERATIONS_USERS_ACTIONS_CONSTANT } from '../User.data';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';

const { ADD_OPERATIONS_USERS, EDIT_OPERATIONS_USERS, OPERATIONS_USERS_DETAIL } =
  OPERATIONS_USERS_ACTIONS_CONSTANT;

export const UpsertUser = () => {
  const {
    upsertUserFormFields,
    methods,
    addProductUserForOperationStatus,
    updateProductUserForOperationStatus,
    closeOperationUserForm,
    submitButtonHandler,
    isLoading,
    isFetching,
    isError,
    refetch,
    igVerificationStatus,
    isPortalOpen,
  } = useUpsertUser();

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isOpen as boolean}
        onClose={closeOperationUserForm}
        title={
          isPortalOpen?.action === OPERATIONS_USERS_DETAIL
            ? TITLE_FORM_USER?.VIEW
            : isPortalOpen?.action === EDIT_OPERATIONS_USERS
              ? TITLE_FORM_USER?.EDIT
              : TITLE_FORM_USER?.ADD
        }
        submitHandler={submitButtonHandler}
        footer
        isOk
        okText={
          isPortalOpen?.action === OPERATIONS_USERS_DETAIL
            ? GENERIC_UPSERT_FORM_CONSTANT?.EDIT
            : isPortalOpen?.action === ADD_OPERATIONS_USERS
              ? GENERIC_UPSERT_FORM_CONSTANT?.ADD
              : GENERIC_UPSERT_FORM_CONSTANT?.SAVE
        }
        cancelText={
          isPortalOpen?.action === OPERATIONS_USERS_DETAIL
            ? GENERIC_UPSERT_FORM_CONSTANT?.BACK
            : GENERIC_UPSERT_FORM_CONSTANT?.CANCEL
        }
        isLoading={
          addProductUserForOperationStatus?.isLoading ||
          updateProductUserForOperationStatus?.isLoading ||
          igVerificationStatus?.isLoading
        }
        isDisabled={
          addProductUserForOperationStatus?.isLoading ||
          updateProductUserForOperationStatus?.isLoading ||
          igVerificationStatus?.isLoading
        }
        disabledCancelBtn={
          addProductUserForOperationStatus?.isLoading ||
          updateProductUserForOperationStatus?.isLoading ||
          igVerificationStatus?.isLoading
        }
      >
        {isLoading || isFetching ? (
          <SkeletonForm />
        ) : isError ? (
          <ApiErrorState canRefresh refresh={refetch} />
        ) : (
          <>
            {isPortalOpen?.action === ADD_OPERATIONS_USERS && (
              <Typography color="slateBlue.main">
                Add a new user to this organization
              </Typography>
            )}
            <Box mt={1}>
              <FormProvider methods={methods}>
                <Grid container spacing={2}>
                  {upsertUserFormFields?.map((item: ReactHookFormFieldsI) => (
                    <Grid item xs={12} key={item?.id}>
                      <item.component
                        {...item?.componentProps}
                        size={'small'}
                        disabled={
                          item?.componentProps?.disabled ||
                          isPortalOpen?.action === OPERATIONS_USERS_DETAIL
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
              </FormProvider>
            </Box>
          </>
        )}
      </CommonDrawer>
    </>
  );
};
