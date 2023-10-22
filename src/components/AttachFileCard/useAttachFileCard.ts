import { pdfImage, xlsImage, docImage } from '@/assets/images';
import { useTheme } from '@mui/material';

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
  return {
    getImageByType,
    theme,
  };
};
