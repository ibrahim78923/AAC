import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box } from '@mui/material';
import { useUpsertTasks } from './useUpsertTasks';
import { BUTTON_TITLE_FORM_USER, TITLE_FORM_USER } from './UpsertTasks.data';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { FormGrid } from '@/components/Grids/FormGrid';
import { DynamicForm } from '@/components/DynamicForm';

export const UpsertTasks = () => {
  const {
    submitUpsertTicketTasks,
    methods,
    handleCloseDrawer,
    handleSubmit,
    upsertTicketTaskFormFormFields,
    hasError,
    form,
    getDynamicFormData,
    isPortalOpen,
    apiCallInProgress,
    showLoader,
  } = useUpsertTasks?.();

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isOpen as boolean}
        onClose={handleCloseDrawer}
        title={TITLE_FORM_USER?.[isPortalOpen?.action as string]}
        submitHandler={handleSubmit?.(submitUpsertTicketTasks)}
        footer
        isOk
        okText={BUTTON_TITLE_FORM_USER?.[isPortalOpen?.action as string]}
        isLoading={apiCallInProgress}
        isDisabled={showLoader}
        disabledCancelBtn={apiCallInProgress}
      >
        <Box mt={1}>
          <ApiRequestFlow
            showSkeleton={showLoader}
            hasError={hasError}
            refreshApi={getDynamicFormData}
          >
            <FormProvider methods={methods}>
              <FormGrid
                spacing={1}
                formFieldsList={upsertTicketTaskFormFormFields}
              >
                <DynamicForm dynamicFormFieldsList={form} />
              </FormGrid>
            </FormProvider>
          </ApiRequestFlow>
        </Box>
      </CommonDrawer>
    </>
  );
};
