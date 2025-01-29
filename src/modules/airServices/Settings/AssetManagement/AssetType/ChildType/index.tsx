import { FormProvider } from '@/components/ReactHookForm';
import useChildType from './useChildType';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { FormGrid } from '@/components/Grids/FormGrid';
import { assetFieldFormFields } from '../AssetType.data';

export default function ChildType({ childDetails, setChildDetails }: any) {
  const {
    onClose,
    methods,
    handleSubmit,
    onSubmit,
    patchChildAssetTypeStatus,
  } = useChildType({
    childDetails,
    setChildDetails,
  });

  return (
    <CustomCommonDialog
      isPortalOpen={childDetails?.open}
      closePortal={onClose}
      handleSubmitButton={handleSubmit(onSubmit)}
      showSubmitLoader={patchChildAssetTypeStatus?.isLoading}
      disabledCancelButton={patchChildAssetTypeStatus?.isLoading}
      dialogTitle={
        childDetails?.childData ? 'Edit Asset Type' : 'Add Asset Type'
      }
      submitButtonText={childDetails?.parentData ? 'Update' : 'Save'}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <FormGrid spacing={1} formFieldsList={assetFieldFormFields} />
      </FormProvider>
    </CustomCommonDialog>
  );
}
