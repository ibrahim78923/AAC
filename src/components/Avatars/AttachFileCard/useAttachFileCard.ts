import { EXCLUDE_FILE_PREVIEW } from '@/constants/file';
import { generateImage } from '@/utils/avatarUtils';
import { makeDownloadLink } from '@/utils/file';
import { useTheme } from '@mui/material';
import { useState } from 'react';

export const useAttachFileCard = (props: any) => {
  const { data, canPreviewImage = true } = props;
  const theme = useTheme();

  const [cross, setCross] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);

  const onClick = () => {
    if (!data?.fileUrl) return;
    if (!canPreviewImage) return;
    if (EXCLUDE_FILE_PREVIEW?.[data?.fileType])
      return makeDownloadLink(data?.orignalName, generateImage(data?.fileUrl));
    setIsPortalOpen(true);
  };

  return {
    theme,
    cross,
    setCross,
    isPortalOpen,
    setIsPortalOpen,
    onClick,
  };
};
