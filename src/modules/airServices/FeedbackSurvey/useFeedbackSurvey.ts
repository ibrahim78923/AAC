import { useState } from 'react';
import { useTheme } from '@mui/material';

export const useFeedbackSurvey = () => {
  const [activeComponent, setActiveComponent] = useState<number>(1);
  const theme: any = useTheme();
  return {
    activeComponent,
    setActiveComponent,
    theme,
  };
};
