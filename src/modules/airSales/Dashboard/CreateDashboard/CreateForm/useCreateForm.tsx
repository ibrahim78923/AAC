import { useState } from 'react';

const useCreateForm = () => {
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [selectedDashoardWidget, setSelectedDashboardWidgets] = useState();
  const [accessValue, setAccessValue] = useState('');
  const handleChangeAccessValue = (event: any) => {
    setAccessValue(event?.target?.value);
  };
  return {
    isOpenPreview,
    setIsOpenPreview,
    selectedDashoardWidget,
    setSelectedDashboardWidgets,
    handleChangeAccessValue,
    accessValue,
    setAccessValue,
  };
};
export default useCreateForm;
