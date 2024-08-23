import { useRouter } from 'next/router';
import { useState } from 'react';

const useCreateForm = () => {
  const router = useRouter();
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [accessValue, setAccessValue] = useState('');
  const handleChangeAccessValue = (event: any) => {
    setAccessValue(event?.target?.value);
  };

  return {
    handleChangeAccessValue,
    setIsOpenPreview,
    setAccessValue,
    isOpenPreview,
    accessValue,
    router
  };
};
export default useCreateForm;
