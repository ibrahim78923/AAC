import { DownloadLargeIcon } from '@/assets/icons';
import { pxToRem } from '@/utils/getFontValue';
import { LoadingButton } from '@mui/lab';

export const DownloadButton = (props: any) => {
  const {
    handleDownload,
    disabled = false,
    loading,
    children = <DownloadLargeIcon />,
  } = props;

  return (
    <LoadingButton
      sx={{
        cursor: 'pointer',
        p: 0,
        minWidth: pxToRem(40),
        height: pxToRem(40),
        marginTop: pxToRem(-10),
      }}
      variant="outlined"
      color="inherit"
      size="small"
      onClick={handleDownload}
      disabled={disabled}
      loading={loading}
    >
      {children}
    </LoadingButton>
  );
};
