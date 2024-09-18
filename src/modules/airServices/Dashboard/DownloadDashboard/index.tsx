import { DOWNLOAD_FILE_TYPE } from '@/constants/strings';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import { useDownloadDashboard } from './useDownloadDashboard';

export const DownloadDashboard = (props: any) => {
  const { isDownloading, downloadReport } = useDownloadDashboard?.(props);
  return (
    <Box display={'flex'} flexWrap={'wrap'} gap={2} my={2}>
      <LoadingButton
        className="small"
        variant="contained"
        disabled={isDownloading?.isLoading}
        onClick={() => downloadReport?.(DOWNLOAD_FILE_TYPE?.PDF)}
        loading={isDownloading?.isPng === DOWNLOAD_FILE_TYPE?.PDF}
      >
        Download as PDF
      </LoadingButton>
      <LoadingButton
        className="small"
        variant="contained"
        disabled={isDownloading?.isLoading}
        loading={isDownloading?.isPng === DOWNLOAD_FILE_TYPE?.PNG}
        onClick={() => downloadReport?.(DOWNLOAD_FILE_TYPE?.PNG)}
      >
        Download as PNG
      </LoadingButton>
    </Box>
  );
};
