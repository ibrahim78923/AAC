import { FormProvider } from '@/components/ReactHookForm';
import { assetFieldFormFields } from '../AssetType.data';
import useParentType from './useParentType';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { FormGrid } from '@/components/Grids/FormGrid';

export default function ParentType({ parentDetails, setParentDetails }: any) {
  const {
    onClose,
    methods,
    handleSubmit,
    onSubmit,
    postAssetTypeStatus,
    patchAssetTypeStatus,
  } = useParentType({ parentDetails, setParentDetails });

  return (
    <CustomCommonDialog
      isPortalOpen={parentDetails?.open}
      closePortal={onClose}
      handleSubmitButton={handleSubmit(onSubmit)}
      showSubmitLoader={
        postAssetTypeStatus?.isLoading || patchAssetTypeStatus?.isLoading
      }
      disabledCancelButton={
        postAssetTypeStatus?.isLoading || patchAssetTypeStatus?.isLoading
      }
      submitButtonText={parentDetails?.parentData ? 'Update' : 'Save'}
      dialogTitle={
        parentDetails?.parentData ? 'Edit Asset Type' : 'Add Asset Type'
      }
      dialogMaxWidth={'sm'}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <FormGrid spacing={1} formFieldsList={assetFieldFormFields} />
      </FormProvider>
    </CustomCommonDialog>
  );
}
