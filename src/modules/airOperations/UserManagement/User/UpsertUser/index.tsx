import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid, Typography } from '@mui/material';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { TITLE_FORM_USER } from './UpsertUser.data';
import { useUpsertUser } from './useUpsertUser';

export const UpsertUser = (props: any) => {
  const { isPortalOpen } = props;
  const {
    upsertUserFormFields,
    methods,
    addProductUserForOperationStatus,
    updateProductUserForOperationStatus,
    closeOperationUserForm,
    submitButtonHandler,
    isLoading,
    isFetching,
  } = useUpsertUser(props);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isUpsert}
        onClose={() => closeOperationUserForm()}
        title={
          isPortalOpen?.isView
            ? TITLE_FORM_USER?.VIEW
            : isPortalOpen?.isEdit
              ? TITLE_FORM_USER?.EDIT
              : TITLE_FORM_USER?.ADD
        }
        submitHandler={() => submitButtonHandler?.()}
        footer
        isOk
        okText={
          isPortalOpen?.isView
            ? GENERIC_UPSERT_FORM_CONSTANT?.EDIT
            : isPortalOpen?.isAdd
              ? GENERIC_UPSERT_FORM_CONSTANT?.ADD
              : GENERIC_UPSERT_FORM_CONSTANT?.SAVE
        }
        cancelText={
          isPortalOpen?.isView
            ? GENERIC_UPSERT_FORM_CONSTANT?.BACK
            : GENERIC_UPSERT_FORM_CONSTANT?.CANCEL
        }
        isLoading={
          addProductUserForOperationStatus?.isLoading ||
          updateProductUserForOperationStatus?.isLoading
        }
        isDisabled={
          addProductUserForOperationStatus?.isLoading ||
          updateProductUserForOperationStatus?.isLoading
        }
        disabledCancelBtn={
          addProductUserForOperationStatus?.isLoading ||
          updateProductUserForOperationStatus?.isLoading
        }
      >
        {isLoading || isFetching ? (
          <SkeletonForm />
        ) : (
          <>
            {isPortalOpen?.isAdd && (
              <Typography color="slateBlue.main">
                Add a new user to this organization
              </Typography>
            )}
            <Box mt={1}>
              <FormProvider methods={methods}>
                <Grid container spacing={2}>
                  {upsertUserFormFields?.map((item: any) => (
                    <Grid item xs={12} key={item?.id}>
                      <item.component
                        {...item?.componentProps}
                        size={'small'}
                        disabled={isPortalOpen?.isView}
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
