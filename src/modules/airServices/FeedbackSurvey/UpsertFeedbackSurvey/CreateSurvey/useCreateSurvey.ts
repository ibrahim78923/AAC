import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { CreateSurveyI } from './CreateSurvey.interface';
export const useCreateSurvey = ({
  methods,
  isLoading,
  setSubmitType,
}: CreateSurveyI) => {
  const { watch, setValue } = methods;
  const [openShare, setOpenShare] = useState(false);
  const linkRef: React.RefObject<HTMLAnchorElement> = useRef(null);
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
    openShare,
    setOpenShare,
    watch,
  };
};
