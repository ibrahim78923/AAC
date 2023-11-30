import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider, RHFFileImport } from '@/components/ReactHookForm';
import { Box, Typography } from '@mui/material';
import { useImportVendor } from './useImportAssets';

const ImportVendor = (props: any) => {
  const { isDrawerOpen } = props;

  const { handleSubmit, onSubmit, methodsAttachments, onClose } =
    useImportVendor(props);

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

export default ImportVendor;
