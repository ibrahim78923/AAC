import { useState } from 'react';

const useSaveAndNewViewDrawer = () => {
  const [accessValue, setAccessValue] = useState('');
  const handleChangeAccessValue = (event: any) => {
    setAccessValue(event?.target?.value);
  };
  return {
    accessValue,
    setAccessValue,
    handleChangeAccessValue,
  };
};
export default useSaveAndNewViewDrawer;
