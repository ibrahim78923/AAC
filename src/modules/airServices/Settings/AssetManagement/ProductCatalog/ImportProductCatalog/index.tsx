import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { useImportProductCatalog } from './useImportProductCatalog';

export const ImportProductCatalog = (props: any) => {
  const { isDrawerOpen } = props;
  const { handleSubmit, onClose, submitImportFile, importFormMethod } =
    useImportProductCatalog(props);
  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={() => onClose?.()}
      okText={'Submit'}
      title={'Filter'}
      submitHandler={() => handleSubmit(submitImportFile)()}
      isOk
      cancelText={'Reset'}
      footer
    >
      <FormProvider
        methods={importFormMethod}
        onSubmit={handleSubmit(submitImportFile)}
      >
        <RHFDropZone name="file" />
      </FormProvider>
    </CommonDrawer>
  );
};
