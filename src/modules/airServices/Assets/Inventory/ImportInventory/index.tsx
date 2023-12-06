import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider, RHFFileImport } from '@/components/ReactHookForm';
import { Box, Typography } from '@mui/material';
import { useImportInventory } from './useImportInventory';

export const ImportInventory = (props: any) => {
  const { isDrawerOpen } = props;

  const { handleSubmit, onClose, submitImportFile, importFormMethod } =
    useImportInventory(props);

  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={() => onClose?.()}
      okText={'Import'}
      title={'Import'}
      submitHandler={() => handleSubmit(submitImportFile)()}
      isOk
      footer
    >
      <Typography variant="h5" color="slateBlue.main">
        {' '}
        Add File{' '}
      </Typography>
      <Box marginY={2} />
      <FormProvider
        methods={importFormMethod}
        onSubmit={handleSubmit(submitImportFile)}
      >
        <RHFFileImport name="file" />
      </FormProvider>
    </CommonDrawer>
  );
};
