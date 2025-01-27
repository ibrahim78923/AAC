import { DownloadLargeIcon } from '@/assets/icons';
import { pxToRem } from '@/utils/getFontValue';
import { LoadingButton } from '@mui/lab';
import { useDownloadButton } from './useDownloadButton';

export const DownloadButton = (props: any) => {
  const {
    disabled = false,
    children = <DownloadLargeIcon />,
    hasStyles = true,
    variant = 'outlined',
    color = 'inherit',
  } = props;

  const { isDownloading, handleDownload } = useDownloadButton(props);

  return (
    <LoadingButton
      sx={{
        ...(hasStyles
          ? {
              cursor: 'pointer',
              p: 0,
              minWidth: pxToRem(40),
              height: pxToRem(40),
              marginTop: pxToRem(-10),
            }
          : {}),
      }}
      variant={variant}
      color={color}
      size="small"
      className="small"
      onClick={handleDownload}
      disabled={isDownloading || disabled}
      loading={isDownloading}
    >
      {children}
    </LoadingButton>
  );
};
