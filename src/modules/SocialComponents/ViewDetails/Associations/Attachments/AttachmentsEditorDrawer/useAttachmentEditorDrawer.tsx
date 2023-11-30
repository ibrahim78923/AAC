import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  attachmentsDefaultValues,
  attachmentsValidationSchema,
} from './AttachmentsEditorDrawer.data';

const useAttachmentsEditorDrawer = () => {
  const methodsAttachments = useForm({
    resolver: yupResolver(attachmentsValidationSchema),
    defaultValues: attachmentsDefaultValues,
  });

  const onSubmit = () => {};
  const { handleSubmit } = methodsAttachments;
  return { handleSubmit, onSubmit, methodsAttachments };
};

export default useAttachmentsEditorDrawer;
