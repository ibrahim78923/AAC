import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider, RHFFileImport } from '@/components/ReactHookForm';
import { useImport } from './useImport';
import { Box } from '@mui/material';
import { MappedColumns } from './MappedColumns';

export const Import = (props: any) => {
  const { isDrawerOpen, title, crmColumnsOptions } = props;

  const {
    handleSubmit,
    onClose,
    submitImportFile,
    importFormMethod,
    showItemsList,
    fields,
    remove,
  } = useImport(props);

  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={() => onClose?.()}
      okText={'Import'}
      title={title}
      submitHandler={() => handleSubmit(submitImportFile)()}
      isOk
      footer
    >
      <Box marginY={2} />
      <FormProvider
        methods={importFormMethod}
        onSubmit={handleSubmit(submitImportFile)}
      >
        {!showItemsList ? (
          <RHFFileImport name="file" label="Add File" />
        ) : (
          <MappedColumns
            name="csvColumns"
            fields={fields}
            remove={remove}
            crmColumnsOptions={crmColumnsOptions}
          />
        )}
      </FormProvider>
    </CommonDrawer>
  );
};
