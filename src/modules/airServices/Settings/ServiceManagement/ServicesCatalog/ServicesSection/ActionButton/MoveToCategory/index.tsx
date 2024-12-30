import { FormProvider, RHFAutocompleteAsync } from '@/components/ReactHookForm';
import useMoveToCategory from './useMoveToCategory';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

export default function MoveToCategory(props: any) {
  const { open } = props;

  const {
    methods,
    handleSubmit,
    onSubmit,
    apiQueryCategory,
    patchServiceCatalogTriggerStatus,
    handleClose,
  } = useMoveToCategory(props);

  return (
    <CustomCommonDialog
      isPortalOpen={open}
      onClose={handleClose}
      dialogTitle={'Move to Category'}
      closePortal={handleClose}
      handleCancelButton={handleClose}
      disabledCancelButton={patchServiceCatalogTriggerStatus?.isLoading}
      handleSubmitButton={handleSubmit(onSubmit)}
      showSubmitLoader={patchServiceCatalogTriggerStatus?.isLoading}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFAutocompleteAsync
          name={'category'}
          label={'Category'}
          placeholder={'Select'}
          size={'small'}
          apiQuery={apiQueryCategory}
          required
          getOptionLabel={(option: any) => option?.categoryName}
        />
      </FormProvider>
    </CustomCommonDialog>
  );
}
