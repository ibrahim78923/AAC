import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

export const useCreateSurvey = ({ methods, isLoading }: any) => {
  const { watch, setValue } = methods;
  const linkRef: any = useRef(null);
  const router = useRouter();
  const customerSupportLinkType = watch('customerSupportLinkType');
  const displayWatch = watch('display');
  useEffect(() => {
    setValue('displayName', '');
  }, [displayWatch]);
  return {
    setValue,
    isLoading,
    linkRef,
    router,
    customerSupportLinkType,
    displayWatch,
  };
};
