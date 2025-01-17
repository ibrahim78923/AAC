import { PageTitledHeader } from '@/components/PageTitledHeader';
import { Box, Chip } from '@mui/material';
import { apiKeys, useCreateEmail } from './useCreateEmail';
import PreviewModal from '../PreviewModal';
import { FormProvider, RHFImageEditor } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

const CreateEmail = () => {
  const {
    openDialog,
    setOpenDialog,
    value,
    handleChange,
    router,
    theme,
    methods,
    onSubmit,
    handleSubmit,
    editorData,
    emailProcess,
    isFetching,
    isLoading,
    isError,
    refetch,
    updateEmailProcess,
    quillRef,
    handleInsertText,
  } = useCreateEmail();

  return (
    <ApiRequestFlow
      showSkeleton={isLoading || isFetching}
      hasError={isError}
      refreshApi={refetch}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <PageTitledHeader
          title={`Email Template`}
          canMovedBack
          moveBack={() => router?.back()}
        />
        <Box pb={1.4}>
          <RHFImageEditor
            name="emailTemplate"
            style={{ height: 600 }}
            placeholder="Enter Email Text"
            quillRef={quillRef}
          />
        </Box>
        {apiKeys?.map((key) => (
          <Chip
            key={key?.id}
            sx={{ m: 0.5 }}
            label={key?.label}
            onClick={() => handleInsertText(key?.value)}
          />
        ))}
        <Box display={'flex'} justifyContent={'space-between'}>
          <LoadingButton
            sx={{
              color: theme?.palette?.grey[500],
              border: ' 1px solid grey.700',
            }}
            onClick={() => setOpenDialog(true)}
            disabled={emailProcess?.isLoading}
          >
            Preview
          </LoadingButton>
          <Box display={'flex'} gap={1}>
            <LoadingButton
              sx={{
                color: theme?.palette?.grey[500],
                border: ' 1px solid grey.700',
              }}
              onClick={() => router?.back()}
              disabled={
                emailProcess?.isLoading || updateEmailProcess?.isLoading
              }
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              variant="contained"
              type="submit"
              loading={emailProcess?.isLoading || updateEmailProcess?.isLoading}
            >
              Save
            </LoadingButton>
          </Box>
        </Box>
        <PreviewModal
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          value={value}
          handleChange={handleChange}
          editorData={editorData}
        />
      </FormProvider>
    </ApiRequestFlow>
  );
};

export default CreateEmail;
