import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { useAttachmentForm } from './useAttachmentForm';
import { uploadFileMaxSize } from '@/utils/avatarUtils';
import { ACCEPT_FILE_EXTENSIONS } from '@/constants/file';
import { CustomLoadingButton } from '@/components/Buttons/CustomLoadingButton';

export const AttachmentForm = (props: any) => {
  const { methods, onSubmit, postAttachmentsStatus, handleSubmit } =
    useAttachmentForm(props);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFDropZone
        name="attachments"
        fileType={`PNG, JPG and PDF (max ${uploadFileMaxSize} MB)`}
        accept={{
          'image/png': ACCEPT_FILE_EXTENSIONS?.PNG,
          'image/jpeg': ACCEPT_FILE_EXTENSIONS?.JPEG,
          'application/pdf': ACCEPT_FILE_EXTENSIONS?.PDF,
        }}
      />
      <br />
      <CustomLoadingButton
        type="submit"
        fullWidth
        loading={postAttachmentsStatus?.isLoading}
        disabled={postAttachmentsStatus?.isLoading}
      >
        Submit
      </CustomLoadingButton>
    </FormProvider>
  );
};
