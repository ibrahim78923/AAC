import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider, RHFFileImport } from '@/components/ReactHookForm';
import { useImportProductCatalog } from './useImportProductCatalog';
import { Box } from '@mui/material';
import { MappedColumns } from './MappedColumns';

export const ImportProductCatalog = (props: any) => {
  const { isDrawerOpen } = props;

  const { handleSubmit, onClose, submitImportFile, importFormMethod } =
    useImportProductCatalog(props);

  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={() => onClose?.()}
      okText={'Import'}
      title={'Import Assets'}
      submitHandler={() => handleSubmit(submitImportFile)()}
      isOk
      footer
    >
      <Box marginY={2} />
      <FormProvider
        methods={importFormMethod}
        onSubmit={handleSubmit(submitImportFile)}
      >
        {'hasColumns' ? (
          <RHFFileImport name="file" label="Add File" />
        ) : (
          <MappedColumns name="csvColumns" />
        )}
      </FormProvider>
    </CommonDrawer>
  );
};
