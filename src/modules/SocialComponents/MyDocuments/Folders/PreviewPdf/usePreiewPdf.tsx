import { Theme, useTheme } from '@mui/material';
import { useState } from 'react';

const usePreiewPdf: any = () => {
  const theme = useTheme<Theme>();
  const [isShow, setIsShow] = useState(false);

  const handleSetHide = () => {
    setIsShow(false);
  };
  return {
    theme,
    isShow,
    setIsShow,
    handleSetHide,
  };
};

export default usePreiewPdf;
