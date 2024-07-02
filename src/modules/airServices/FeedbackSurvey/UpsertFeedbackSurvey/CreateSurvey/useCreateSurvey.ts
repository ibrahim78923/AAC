import { useRouter } from 'next/router';
import { useRef } from 'react';

export const useCreateSurvey = ({ methods, isLoading, setSubmitType }: any) => {
  const { watch, setValue } = methods;
  const linkRef: any = useRef(null);
  const router = useRouter();
  const customerSupportLinkType = watch('customerSupportLinkType');
  const displayWatch = watch('display');
  return {
    setValue,
    isLoading,
    linkRef,
    router,
    customerSupportLinkType,
    displayWatch,
    setSubmitType,
  };
};
