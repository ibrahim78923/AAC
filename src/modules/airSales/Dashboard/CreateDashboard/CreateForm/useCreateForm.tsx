import { useState } from 'react';

const useCreateForm = () => {
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [selectedDashoardWidget, setSelectedDashboardWidgets] = useState();
  return {
    isOpenPreview,
    setIsOpenPreview,
    selectedDashoardWidget,
    setSelectedDashboardWidgets,
  };
};
export default useCreateForm;
