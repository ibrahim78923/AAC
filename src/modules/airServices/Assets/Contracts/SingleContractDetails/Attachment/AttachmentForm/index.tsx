import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  attachmentFormDefaultFormValues,
  attachmentFormSchemaFunction,
} from './AttachmentForm.data';
import { Button } from '@mui/material';

export const AttachmentForm = () => {
  const methods = useForm({
    resolver: yupResolver(attachmentFormSchemaFunction),
    defaultValues: attachmentFormDefaultFormValues,
  });

  const submitAttachmentForm = () => {
    // console.log(data);
  };
  return (
    <>
      <FormProvider
        methods={methods}
        onSubmit={methods.handleSubmit(submitAttachmentForm)}
      >
        <RHFDropZone name="attachments" />
        <br />
        <Button type="submit" fullWidth size="small" variant="contained">
          Submit
        </Button>
      </FormProvider>
    </>
  );
};
