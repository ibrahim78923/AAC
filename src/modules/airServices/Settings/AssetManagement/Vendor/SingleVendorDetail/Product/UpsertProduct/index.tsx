import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertProduct } from './useUpsertProduct';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { FormGrid } from '@/components/Grids/FormGrid';

export const UpsertProduct = (props: any) => {
  const { upsertProductModal, editData } = props;
  const {
    methods,
    handleSubmit,
    isSubmit,
    editSubmit,
    handleCancel,
    upsertProductFields,
    putProductVendorProgress,
    postProductVendorProgress,
  } = useUpsertProduct(props);

  return (
    <CustomCommonDialog
      isPortalOpen={upsertProductModal}
      closePortal={handleCancel}
      handleSubmitButton={
        editData?._id ? handleSubmit(editSubmit) : handleSubmit(isSubmit)
      }
      disabledCancelButton={
        putProductVendorProgress?.isLoading ||
        postProductVendorProgress?.isLoading
      }
      showSubmitLoader={
        putProductVendorProgress?.isLoading ||
        postProductVendorProgress?.isLoading
      }
      submitButtonText={editData?._id ? 'Update' : 'Save'}
      dialogTitle={editData?._id ? 'Update Product' : 'Add Product'}
    >
      <FormProvider methods={methods}>
        <FormGrid formFieldsList={upsertProductFields} />
      </FormProvider>
    </CustomCommonDialog>
  );
};
