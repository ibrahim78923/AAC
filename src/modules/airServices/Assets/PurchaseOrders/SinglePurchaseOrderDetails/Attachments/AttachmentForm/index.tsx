import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { useAttachmentForm } from './useAttachmentForm';
import { LoadingButton } from '@mui/lab';

export const AttachmentForm = (props: any) => {
  const { methods, onSubmit, postAttachmentsStatus, handleSubmit } =
    useAttachmentForm(props);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFDropZone name="attachments" />
      <LoadingButton
        type="submit"
        fullWidth
        className="small"
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
