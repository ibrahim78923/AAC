import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box } from '@mui/material';
import { useAddTime } from './useAddTime';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { FormGrid } from '@/components/Grids/FormGrid';
import { DynamicForm } from '@/components/DynamicForm';

export const AddTime = (props: any) => {
  const { isDrawerOpen } = props;
  const {
    methods,
    handleSubmit,
    onSubmit,
    addTimeFormFields,
    closeDrawer,
    isDynamicFormLoading,
    hasDynamicFormError,
    apiCallInProgress,
    form,
    getDynamicFormData,
  } = useAddTime(props);

  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={closeDrawer}
      title="Add Time"
      submitHandler={handleSubmit(onSubmit)}
      footer
      isOk
      okText="Submit"
      isLoading={apiCallInProgress}
      isDisabled={apiCallInProgress}
      disabledCancelBtn={apiCallInProgress}
    >
      <Box>
        <ApiRequestFlow
          showSkeleton={isDynamicFormLoading}
          hasError={hasDynamicFormError}
          refreshApi={getDynamicFormData}
        >
          <FormProvider methods={methods}>
            <FormGrid formFieldsList={addTimeFormFields} />
            <DynamicForm dynamicFormFieldsList={form} />
          </FormProvider>
        </ApiRequestFlow>
      </Box>
    </CommonDrawer>
  );
};
