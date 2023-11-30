import { PdfImage, XlsImage, DocImage } from '@/assets/images';
import { useTheme } from '@mui/material';
import { useState } from 'react';

export const useAttachFileCard = () => {
  const getImageByType = (data: any) => {
    const imageData: any = {
      pdf: PdfImage,
      xls: XlsImage,
      doc: DocImage,
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
