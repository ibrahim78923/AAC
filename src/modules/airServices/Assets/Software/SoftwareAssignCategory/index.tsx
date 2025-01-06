import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { useSoftwareAssignCategory } from './useSoftwareAssignCategory';
import { SoftwareAssignCategoryI } from './SoftwareAssignCategory.interface';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

export const SoftwareAssignCategory: React.FC<SoftwareAssignCategoryI> = (
  params,
) => {
  const { openAssignModal, setOpenAssignModal } = params;
  const { onSubmit, handleSubmit, methods, putSoftwareAssignCategoryStatus } =
    useSoftwareAssignCategory(params);

  return (
    <CustomCommonDialog
      isPortalOpen={openAssignModal}
      closePortal={() => setOpenAssignModal(false)}
      dialogTitle="Assign Category"
      submitButtonText="Assign"
      showSubmitLoader={putSoftwareAssignCategoryStatus?.isLoading}
      disabledCancelButton={putSoftwareAssignCategoryStatus?.isLoading}
      handleSubmitButton={handleSubmit(onSubmit)}
    >
      <FormProvider methods={methods}>
        <RHFTextField
          name="category"
          size="small"
          placeholder="Enter Category"
          required
          fullWidth
          label="Category"
        />
      </FormProvider>
    </CustomCommonDialog>
  );
};
