import { FormProvider } from '@/components/ReactHookForm';
import GetSoftwareContractDropdown from '../../../SoftwareFormFieldsDropdowns/GetSoftwareContractDropdown';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { useAllocateContract } from './useAllocateContract';

export const AllocateContract = (props: any) => {
  const { isPortalOpen } = props;

  const {
    allocateContractSubmit,
    closeModal,
    isLoading,
    methods,
    handleSubmit,
  } = useAllocateContract(props);

  return (
    <CustomCommonDialog
      isPortalOpen={isPortalOpen?.isOpen}
      closePortal={closeModal}
      dialogTitle="Add Contract"
      showSubmitLoader={isLoading}
      disabledCancelButton={isLoading}
      handleSubmitButton={handleSubmit(allocateContractSubmit)}
    >
      <FormProvider methods={methods}>
        <GetSoftwareContractDropdown />
      </FormProvider>
    </CustomCommonDialog>
  );
};
