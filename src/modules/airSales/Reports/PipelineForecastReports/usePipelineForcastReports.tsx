import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

const usePipelineForcastReports = () => {
  const [activeCard, setActiveCard] = useState('total');
  const theme = useTheme();
  const router = useRouter();
  const activeCardObj = {
    TOTAL: 'total',
    OVERTIME: 'overtime',
    COMPARISON: 'comparison',
  };

  return {
    activeCard,
    setActiveCard,
    theme,
    router,
    activeCardObj,
  };
};

export default usePipelineForcastReports;
