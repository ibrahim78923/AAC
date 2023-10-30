import { pdfImage, xlsImage, docImage } from '@/assets/images';
import { useTheme } from '@mui/material';
import { useState } from 'react';

export const useAttachFileCard = () => {
  const getImageByType = (data: any) => {
    const imageData: any = {
      pdf: pdfImage,
      xls: xlsImage,
      doc: docImage,
    };
    return imageData?.[data?.type] || data?.image;
  };

  const theme = useTheme();

  const [cross, setCross] = useState(false);

  return {
    getImageByType,
    theme,
    cross,
    setCross,
  };
};
