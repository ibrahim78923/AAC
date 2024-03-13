import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { useAttachmentForm } from './useAttachmentForm';
import { LoadingButton } from '@mui/lab';

export const AttachmentForm = (props: any) => {
  const { methods, onSubmit, postAttachmentsStatus } = useAttachmentForm(props);

  return (
    <FormProvider methods={methods} onSubmit={methods?.handleSubmit(onSubmit)}>
      <RHFDropZone name="attachments" />
      <LoadingButton
        type="submit"
        fullWidth
        size="small"
        variant="contained"
        sx={{ mt: 2 }}
        loading={postAttachmentsStatus?.isLoading}
        disabled={postAttachmentsStatus?.isLoading}
      >
        Submit
      </LoadingButton>
    </FormProvider>
  );
};
