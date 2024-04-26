import { PdfImage, XlsImage, DocImage } from '@/assets/images';
import { generateImage } from '@/utils/avatarUtils';
import { useTheme } from '@mui/material';
import { useState } from 'react';

export const useAttachFileCard = () => {
  const getImageByType = (data: any) => {
    const imageData: any = {
      pdf: PdfImage,
      xls: XlsImage,
      doc: DocImage,
    };
    return imageData?.[data?.fileType]?.src || generateImage(data?.fileUrl);
  };

  const theme = useTheme();

  const [cross, setCross] = useState(false);

  return {
    theme,
    cross,
    setCross,
    getImageByType,
  };
};
