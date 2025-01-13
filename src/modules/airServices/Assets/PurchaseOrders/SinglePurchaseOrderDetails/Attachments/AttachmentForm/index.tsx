import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { useAttachmentForm } from './useAttachmentForm';
import { LoadingButton } from '@mui/lab';
import { uploadFileMaxSize } from '@/utils/avatarUtils';

export const AttachmentForm = (props: any) => {
  const { methods, onSubmit, postAttachmentsStatus, handleSubmit } =
    useAttachmentForm(props);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFDropZone
        name="attachments"
        fileType={`PNG, JPG and PDF (max ${uploadFileMaxSize} MB)`}
        accept={{
          'image/png': ['.png', '.PNG'],
          'image/jpeg': ['.jpg', '.jpeg', '.JPG', '.JPEG'],
          'application/pdf': ['.pdf'],
        }}
      />
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
