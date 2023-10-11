import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

// import { useState } from 'react';
import {
  AttachmentsDefaultValues,
  AttachmentsValidation,
} from './UploadAttachements.data';

// import { useRouter } from 'next/router';
// import { useState } from 'react';
// const router = useRouter();
// const [route, setRoute] = useState();
export default function useUploadAttachments() {
  // const [fileSubmit, setFileSubmit] = useState(false);
  const methods: any = useForm({
    resolver: yupResolver(AttachmentsValidation),
    defaultValues: AttachmentsDefaultValues,
  });
  const {
    handleSubmit,
    // formState: { isSubmitting },
  } = methods;
  const onSubmit = async () => {
    // setFileSubmit(true);
    // router.push('/logitech-mouse' + route);
  };
  return {
    // setFileSubmit,
    // fileSubmit,
    methods,
    handleSubmit,
    onSubmit,
  };
}
