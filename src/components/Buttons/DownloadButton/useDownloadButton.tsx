import { DOWNLOAD_FILE_TYPE } from '@/constants/strings';
import { htmlToPngConvert } from '@/lib/html-to-image-converter';
import { htmlToPdfConvert } from '@/lib/html-to-pdf-converter';
import { useTheme } from '@mui/material';
import { useState } from 'react';

export const useDownloadButton = (props: any) => {
  const { disabled, downloadRef, name, downloadFileType } = props;
  const theme = useTheme();
  const whiteColor = theme?.palette?.common?.white;
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (disabled) return;
    setIsDownloading(true);
    try {
      downloadFileType === DOWNLOAD_FILE_TYPE?.PNG
        ? await htmlToPngConvert?.(downloadRef, whiteColor, name)
        : await htmlToPdfConvert?.(downloadRef, name, 20);
    } catch (error) {}
    setIsDownloading(false);
  };

  return { isDownloading, handleDownload };
};
