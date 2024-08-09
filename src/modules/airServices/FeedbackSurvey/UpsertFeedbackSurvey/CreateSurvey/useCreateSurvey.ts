import { useLazyAllUserDropdownQuery } from '@/services/airServices/feedback-survey';
import { UseFormReturn, FieldValues } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
export const useCreateSurvey = ({
  methods,
  isLoading,
  setSubmitType,
}: {
  methods: UseFormReturn<FieldValues>;
  isLoading: boolean;
  setSubmitType: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { watch, setValue } = methods;
  const [openShare, setOpenShare] = useState(false);
  const linkRef: React.RefObject<HTMLAnchorElement> = useRef(null);
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
