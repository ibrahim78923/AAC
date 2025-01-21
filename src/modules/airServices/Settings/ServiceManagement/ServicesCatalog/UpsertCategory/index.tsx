import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { useUpsertCategory } from './useUpsertCategory';
import { FormProvider } from '@/components/ReactHookForm';
import { upsertServiceCategoryFormFields } from './UpsertCategory.data';
import { FormGrid } from '@/components/Grids/FormGrid';

export const UpsertCategory = (props: any) => {
  const { isPortalOpen } = props;

  const {
    methods,
    handleSubmit,
    onSubmit,
    handleClose,
    postServiceCatalogTriggerStatus,
  } = useUpsertCategory(props);

  return (
    <CustomCommonDialog
      isPortalOpen={isPortalOpen}
      onClose={handleClose}
      dialogTitle={'New Service Category'}
      closePortal={handleClose}
      handleCancelButton={handleClose}
      disabledCancelButton={postServiceCatalogTriggerStatus?.isLoading}
      handleSubmitButton={handleSubmit(onSubmit)}
      showSubmitLoader={postServiceCatalogTriggerStatus?.isLoading}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <FormGrid formFieldsList={upsertServiceCategoryFormFields} md={12} />
      </FormProvider>
    </CustomCommonDialog>
  );
};
