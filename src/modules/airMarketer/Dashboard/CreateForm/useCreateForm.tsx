import { useState } from 'react';
const useCreateForm = () => {
  const [isShowDashboardTemplate, setIsShowDashboardTemplate] = useState(false);
  return { isShowDashboardTemplate, setIsShowDashboardTemplate };
};
export default useCreateForm;
