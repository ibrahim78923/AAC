import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider, RHFFileImport } from '@/components/ReactHookForm';
import { Box, Typography } from '@mui/material';
import { useImportAssets } from './useImportAssets';

const ImportAssets = (props: any) => {
  const { isDrawerOpen } = props;

  const { handleSubmit, onSubmit, methodsAttachments, onClose } =
    useImportAssets(props);

  return (
    <>
      <CommonDrawer
        footer={true}
        isDrawerOpen={isDrawerOpen}
        onClose={() => onClose?.()}
        title="Import Assets"
        okText="Import"
        isOk
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box>
          <Typography>Add File</Typography>
          <FormProvider
            methods={methodsAttachments}
            onSubmit={handleSubmit(onSubmit)}
          >
            <RHFFileImport name="file" />
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
};

export default ImportAssets;
