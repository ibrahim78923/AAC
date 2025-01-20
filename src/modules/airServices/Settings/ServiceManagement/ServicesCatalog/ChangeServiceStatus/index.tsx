import { FormProvider } from '@/components/ReactHookForm';
import { changeStatusData } from './ChangeServiceStatus.data';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { useChangeServiceStatus } from './useChangeServiceStatus';
import { FormGrid } from '@/components/Grids/FormGrid';

export const ChangeServiceStatus = (props: any) => {
  const { openStatus } = props;

  const {
    methods,
    handleSubmit,
    onSubmit,
    patchServiceCatalogTriggerStatus,
    handleClose,
  } = useChangeServiceStatus(props);

  return (
    <CustomCommonDialog
      isPortalOpen={openStatus}
      onClose={handleClose}
      dialogTitle={'Change Status'}
      closePortal={handleClose}
      handleCancelButton={handleClose}
      disabledCancelButton={patchServiceCatalogTriggerStatus?.isLoading}
      handleSubmitButton={handleSubmit(onSubmit)}
      showSubmitLoader={patchServiceCatalogTriggerStatus?.isLoading}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <FormGrid formFieldsList={changeStatusData} />
      </FormProvider>
    </CustomCommonDialog>
  );
};
