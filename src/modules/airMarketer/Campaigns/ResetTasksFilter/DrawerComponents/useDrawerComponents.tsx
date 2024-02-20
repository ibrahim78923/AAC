import { useState } from 'react';
import { useTheme } from '@mui/material';
import Task from './Task';
import Comments from './Comments';
import Calander from './Calendar';

const useDrawerComponents = () => {
  const theme = useTheme();
  const [selectedButton, setSelectedButton] = useState('tasks');

  const handleActiveButton = (active: any) => {
    switch (active) {
      case 'comments':
        return <Comments />;
      case 'calander':
        return <Calander />;
      default:
        return <Task />;
    }
  };

  return {
    theme,
    selectedButton,
    setSelectedButton,
    handleActiveButton,
  };
};
export default useDrawerComponents;
