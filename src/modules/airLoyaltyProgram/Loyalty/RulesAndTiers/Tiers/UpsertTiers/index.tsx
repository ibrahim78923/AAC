import CommonDrawer from '@/components/CommonDrawer';
import { useUpsertTiers } from './useUpsertTiers';
import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { FORM_STEP_CONSTANT } from './UpsertTiers.data';
import { RULES_AND_TIERS_PORTAL_ACTION_CONSTANTS } from '../../RulesAndTiers.constant';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

export const UpsertTiers = () => {
  const {
    isPortalOpen,
    closePortal,
    upsertTiersBasicFormFields,
    methods,
    submitUpsertTiers,
    isFormValid,
    cancelBtnHandler,
    formStep,
    watch,
    apiCallInProgress,
    showLoader,
    isError,
    refetch,
  } = useUpsertTiers();

  return (
    <CommonDrawer
      isDrawerOpen={isPortalOpen?.isOpen}
      footer
      isOk={
        formStep === FORM_STEP_CONSTANT?.FIRST_STEP ||
        (formStep === FORM_STEP_CONSTANT?.SECOND_STEP && !!watch('attribute'))
      }
      okText={
        formStep === FORM_STEP_CONSTANT?.FIRST_STEP
          ? GENERIC_UPSERT_FORM_CONSTANT?.NEXT
          : isPortalOpen?.action ===
              RULES_AND_TIERS_PORTAL_ACTION_CONSTANTS?.EDIT_TIERS
            ? GENERIC_UPSERT_FORM_CONSTANT?.UPDATE
            : GENERIC_UPSERT_FORM_CONSTANT?.SAVE
      }
      title={isPortalOpen?.action}
      onClose={closePortal}
      cancelBtnHandler={cancelBtnHandler}
      submitHandler={submitUpsertTiers}
      isLoading={apiCallInProgress}
      isDisabled={!isFormValid}
      cancelText={
        formStep === FORM_STEP_CONSTANT?.SECOND_STEP
          ? GENERIC_UPSERT_FORM_CONSTANT?.BACK
          : GENERIC_UPSERT_FORM_CONSTANT?.CANCEL
      }
      disabledCancelBtn={apiCallInProgress}
    >
      <ApiRequestFlow
        showSkeleton={showLoader}
        hasError={isError}
        refresh={refetch}
      >
        <FormProvider methods={methods}>
          <Grid container spacing={1.5}>
            {upsertTiersBasicFormFields?.map((item: any) => (
              <Grid item xs={12} key={item?.id}>
                <item.component {...item?.componentProps} size="small">
                  {item?.heading ? item?.heading : <></>}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </ApiRequestFlow>
    </CommonDrawer>
  );
};
