import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertVendor } from './useUpsertVendor';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { FormGrid } from '@/components/Grids/FormGrid';

export const UpsertAsset = (props: any) => {
  const { isUpsertModalOpen, setIsUpsertModalOpen } = props;

  const {
    methods,
    handleSubmit,
    onSubmit,
    upsertVendorDataArray,
    postVendorStatus,
    patchVendorStatus,
  } = useUpsertVendor(setIsUpsertModalOpen, isUpsertModalOpen);

  return (
    <CustomCommonDialog
      isPortalOpen={isUpsertModalOpen?.open}
      closePortal={() => setIsUpsertModalOpen?.({ open: false, data: null })}
      handleSubmitButton={handleSubmit(onSubmit)}
      disabledCancelButton={
        postVendorStatus?.isLoading || patchVendorStatus?.isLoading
      }
      showSubmitLoader={
        postVendorStatus?.isLoading || patchVendorStatus?.isLoading
      }
      submitButtonText={isUpsertModalOpen?.data ? 'Update' : 'Save'}
      dialogTitle={isUpsertModalOpen?.data ? 'Update Vendor' : 'Add Vendor'}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <FormGrid spacing={1} formFieldsList={upsertVendorDataArray} />
      </FormProvider>
    </CustomCommonDialog>
  );
};
