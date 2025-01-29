import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { useAddNewVendor } from './useAddNewVendor';
import { newVendorDataArray } from './AddNewVendor.data';
import { IVendorProps } from '../Vendor.interface';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { FormGrid } from '@/components/Grids/FormGrid';
import { DynamicForm } from '@/components/DynamicForm';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';

const AddNewVendor = (props: IVendorProps) => {
  const { isADrawerOpen, update } = props;

  const {
    methods,
    handleSubmit,
    onSubmit,
    handleClose,
    form,
    apiCallInProgress,
    refreshApi,
    hasError,
    showLoader,
  } = useAddNewVendor(props);

  return (
    <CommonDrawer
      footer
      isDrawerOpen={isADrawerOpen as boolean}
      onClose={handleClose}
      title={`${
        update
          ? GENERIC_UPSERT_FORM_CONSTANT?.EDIT
          : GENERIC_UPSERT_FORM_CONSTANT?.NEW
      } Vendor`}
      okText="Save"
      isOk
      submitHandler={handleSubmit(onSubmit)}
      isLoading={apiCallInProgress}
      isDisabled={apiCallInProgress}
      disabledCancelBtn={apiCallInProgress}
    >
      <ApiRequestFlow
        showSkeleton={showLoader}
        hasError={hasError}
        refreshApi={refreshApi}
      >
        <FormProvider methods={methods}>
          <FormGrid formFieldsList={newVendorDataArray}>
            <DynamicForm dynamicFormFieldsList={form} />
          </FormGrid>
        </FormProvider>
      </ApiRequestFlow>
    </CommonDrawer>
  );
};

export default AddNewVendor;
