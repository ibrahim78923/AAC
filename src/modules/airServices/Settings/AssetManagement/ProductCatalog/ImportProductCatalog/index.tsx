import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { useImportProductCatalog } from './useImportProductCatalog';
import { Box, Typography } from '@mui/material';

export const ImportProductCatalog = (props: any) => {
  const { isDrawerOpen } = props;
  const { handleSubmit, onClose, submitImportFile, importFormMethod } =
    useImportProductCatalog(props);
  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={() => onClose?.()}
      okText={'Submit'}
      title={'Import Assets'}
      submitHandler={() => handleSubmit(submitImportFile)()}
      isOk
      footer
    >
      <Typography variant="body3"> Add File </Typography>
      <Box marginY={3} />
      <FormProvider
        methods={importFormMethod}
        onSubmit={handleSubmit(submitImportFile)}
      >
        <RHFDropZone name="file" />
      </FormProvider>
    </CommonDrawer>
  );
};
