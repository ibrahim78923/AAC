import { DOWNLOAD_FILE_TYPE } from '@/constants/strings';
import { htmlToPdfConvert, htmlToPngConvert } from '@/utils/file';
import { useTheme } from '@mui/material';
import { useState } from 'react';

export const useDownloadDashboard = (props: any) => {
  const { name, downloadRef } = props;
  const theme = useTheme();
  const [isDownloading, setIsDownloading] = useState<any>({});

  const downloadReport = async (isPng?: any) => {
    setIsDownloading({ isLoading: true, isPng });
    try {
      isPng === DOWNLOAD_FILE_TYPE?.PNG
        ? await htmlToPngConvert?.(
            downloadRef,
            theme?.palette?.common?.white,
            name,
          )
        : await htmlToPdfConvert?.(downloadRef, name, 20);
    } catch (error) {}
    setIsDownloading({});
  };

  return {
    isDownloading,
    downloadReport,
  };
};
