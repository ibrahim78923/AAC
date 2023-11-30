import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { defaultValues, validationSchema } from './AttachmentForm.data';
import { Button } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

export const AttachmentForm = ({ setAddAttachment }: any) => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const onSubmit = () => {
    enqueueSnackbar('Attachment Added Successfully!', {
      variant: 'success',
    });
    setAddAttachment(false);
  };

  return (
    <FormProvider methods={methods} onSubmit={methods?.handleSubmit(onSubmit)}>
      <RHFDropZone name="attachments" />
      <Button
        type="submit"
        fullWidth
        size="small"
        variant="contained"
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </FormProvider>
  );
};
