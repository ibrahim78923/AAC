import { useState } from 'react';
const useDashboard = () => {
  const [isShowCreateDashboardForm, setIsShowCreateDashboardForm] =
    useState(false);
  const [isShowEditDashboard, setIsShowEditDashboard] = useState(false);

  return {
    isShowCreateDashboardForm,
    setIsShowCreateDashboardForm,
    isShowEditDashboard,
    setIsShowEditDashboard,
  };
};
export default useDashboard;
