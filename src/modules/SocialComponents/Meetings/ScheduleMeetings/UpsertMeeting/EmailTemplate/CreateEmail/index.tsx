import { PageTitledHeader } from '@/components/PageTitledHeader';
import { Box } from '@mui/material';
import { useCreateEmail } from './useCreateEmail';
import PreviewModal from '../PreviewModal';
import { FormProvider, RHFImageEditor } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';

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
    templateType,
    updateEmailProcess,
  } = useCreateEmail();
  if (isLoading || isFetching) return <SkeletonForm />;
  if (isError) return <ApiErrorState canRefresh refresh={() => refetch?.()} />;
  return (
    <>
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
            disabled={templateType === GENERIC_UPSERT_FORM_CONSTANT?.USE}
          />
        </Box>
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
    </>
  );
};

export default CreateEmail;
