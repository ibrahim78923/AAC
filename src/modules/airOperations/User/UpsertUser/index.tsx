import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid, Typography } from '@mui/material';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { SUBMIT_BUTTON_TEXT, TITLE_FORM_USER } from './UpsertUser.data';
import { useUpsertUser } from './useUpsertUser';
import { OPERATIONS_USERS_ACTIONS_CONSTANT } from '../User.data';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

const { ADD_OPERATIONS_USERS, OPERATIONS_USERS_DETAIL } =
  OPERATIONS_USERS_ACTIONS_CONSTANT;

export const UpsertUser = () => {
  const {
    upsertUserFormFields,
    methods,
    closePortal,
    submitButtonHandler,
    isLoading,
    isFetching,
    isError,
    refetch,
    isPortalOpen,
    apiCallInProgress,
  } = useUpsertUser();

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isOpen as boolean}
        onClose={closePortal}
        title={TITLE_FORM_USER?.[isPortalOpen?.action]}
        submitHandler={submitButtonHandler}
        footer
        isOk
        okText={SUBMIT_BUTTON_TEXT?.[isPortalOpen?.action]}
        cancelText={GENERIC_UPSERT_FORM_CONSTANT?.CANCEL}
        isLoading={apiCallInProgress}
        isDisabled={apiCallInProgress}
        disabledCancelBtn={apiCallInProgress}
      >
        <ApiRequestFlow
          showSkeleton={isLoading || isFetching}
          hasError={isError}
          refreshApi={refetch}
        >
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
        </ApiRequestFlow>
      </CommonDrawer>
    </>
  );
};
