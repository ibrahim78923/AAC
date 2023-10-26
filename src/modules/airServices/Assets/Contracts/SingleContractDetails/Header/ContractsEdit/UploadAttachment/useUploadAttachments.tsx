import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import {
  AttachmentsDefaultValues,
  AttachmentsValidation,
} from './UploadAttachements.data';

export default function useUploadAttachments() {
  // const [fileSubmit, setFileSubmit] = useState(false);
  const methods: any = useForm({
    resolver: yupResolver(AttachmentsValidation),
    defaultValues: AttachmentsDefaultValues,
  });
  const { handleSubmit } = methods;
  const onSubmit = async () => {};
  return {
    methods,
    handleSubmit,
    onSubmit,
  };
}
