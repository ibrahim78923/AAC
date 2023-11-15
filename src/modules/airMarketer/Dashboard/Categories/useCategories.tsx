import { useState } from 'react';
import { useTheme } from '@mui/material';

const useCategories = () => {
  const theme = useTheme();
  const [isShowCreateDashboard, setIsShowCreateDashboard] = useState(false);
  return {
    theme,
    isShowCreateDashboard,
    setIsShowCreateDashboard,
  };
};
export default useCategories;
