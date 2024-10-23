import { DOWNLOAD_FILE_TYPE } from '@/constants/strings';
import { htmlToPngConvert } from '@/lib/html-to-image-converter';
import { htmlToPdfConvert } from '@/lib/html-to-pdf-converter';
import { useTheme } from '@mui/material';
import { useState } from 'react';

const { PNG } = DOWNLOAD_FILE_TYPE ?? {};

export const useDownloadDashboard = (props: any) => {
  const { name, downloadRef } = props;
  const theme = useTheme();
  const whiteColor = theme?.palette?.common?.white;
  const [isDownloading, setIsDownloading] = useState<any>({});

  const downloadReport = async (isPng?: any) => {
    setIsDownloading({ isLoading: true, isPng });
    try {
      isPng === PNG
        ? await htmlToPngConvert?.(downloadRef, whiteColor, name)
        : await htmlToPdfConvert?.(downloadRef, name, 20);
    } catch (error) {}
    setIsDownloading({});
  };

  return {
    isDownloading,
    downloadReport,
  };
};
