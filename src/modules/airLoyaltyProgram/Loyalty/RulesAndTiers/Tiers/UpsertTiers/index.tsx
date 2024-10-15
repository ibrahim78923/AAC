import CommonDrawer from '@/components/CommonDrawer';
import { useUpsertTiers } from './useUpsertTiers';
import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { FORM_STEP_CONSTANT } from './UpsertTiers.data';

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
  } = useUpsertTiers();

  return (
    <CommonDrawer
      isDrawerOpen={isPortalOpen?.isOpen}
      footer
      isOk={
        formStep === FORM_STEP_CONSTANT?.FIRST_STEP ||
        (formStep === FORM_STEP_CONSTANT?.SECOND_STEP && !!watch('attribute'))
      }
      okText={formStep === FORM_STEP_CONSTANT?.FIRST_STEP ? 'Next' : 'Save'}
      title={isPortalOpen?.action}
      onClose={closePortal}
      cancelBtnHandler={cancelBtnHandler}
      submitHandler={submitUpsertTiers}
      isLoading={apiCallInProgress}
      isDisabled={!isFormValid}
      cancelText={
        formStep === FORM_STEP_CONSTANT?.SECOND_STEP ? 'Back' : 'Cancel'
      }
      disabledCancelBtn={apiCallInProgress}
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
    </CommonDrawer>
  );
};
