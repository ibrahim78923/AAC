import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useUpsertRequester } from './useUpsertRequester';
import { IRequestersProps } from '../Requesters.interface';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { FormGrid } from '@/components/Grids/FormGrid';
import { DynamicForm } from '@/components/DynamicForm';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';

const UpsertRequesters = (props: IRequestersProps) => {
  const { isDrawerOpen } = props;
  const {
    handleClose,
    methods,
    handleSubmit,
    submitUpsertRequester,
    _id,
    upsertRequestersFormFields,
    form,
    apiCallInProgress,
    getDynamicFormData,
    isDynamicFormLoading,
    hasDynamicFormError,
  }: any = useUpsertRequester(props);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen as boolean}
        onClose={handleClose}
        title={`${
          !!_id
            ? GENERIC_UPSERT_FORM_CONSTANT?.EDIT
            : GENERIC_UPSERT_FORM_CONSTANT?.ADD
        } Requestor`}
        submitHandler={() => handleSubmit(submitUpsertRequester)()}
        footer
        isOk
        okText={
          !!_id
            ? GENERIC_UPSERT_FORM_CONSTANT?.UPDATE
            : GENERIC_UPSERT_FORM_CONSTANT?.SUBMIT
        }
        isLoading={apiCallInProgress}
        isDisabled={apiCallInProgress}
        disabledCancelBtn={apiCallInProgress}
      >
        <ApiRequestFlow
          showSkeleton={isDynamicFormLoading}
          hasError={hasDynamicFormError}
          refreshApi={getDynamicFormData}
        >
          <FormProvider methods={methods}>
            <FormGrid formFieldsList={upsertRequestersFormFields} spacing={1}>
              <DynamicForm dynamicFormFieldsList={form} />
            </FormGrid>
          </FormProvider>
        </ApiRequestFlow>
      </CommonDrawer>
    </>
  );
};

export default UpsertRequesters;
