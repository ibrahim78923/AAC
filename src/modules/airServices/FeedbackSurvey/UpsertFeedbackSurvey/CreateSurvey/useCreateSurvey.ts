import { useLazyAllUserDropdownQuery } from '@/services/airServices/feedback-survey';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

export const useCreateSurvey = ({ methods, isLoading, setSubmitType }: any) => {
  const { watch, setValue } = methods;
  const [openShare, setOpenShare] = useState(false);
  const linkRef: any = useRef(null);
  const router = useRouter();
  const customerSupportLinkType = watch('customerSupportLinkType');
  const displayWatch = watch('display');
  const userDropdown = useLazyAllUserDropdownQuery();
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
    userDropdown,
  };
};
