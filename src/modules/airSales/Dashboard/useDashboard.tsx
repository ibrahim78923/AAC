import { useState } from 'react';
const useDashboard = () => {
  const [isShowCreateDashboardForm, setIsShowCreateDashboardForm] =
    useState(false);

  return { isShowCreateDashboardForm, setIsShowCreateDashboardForm };
};
export default useDashboard;
