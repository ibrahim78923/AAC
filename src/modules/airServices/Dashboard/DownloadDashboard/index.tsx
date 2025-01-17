import { DOWNLOAD_FILE_TYPE } from '@/constants/strings';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import { useDownloadDashboard } from './useDownloadDashboard';

const { PNG, PDF } = DOWNLOAD_FILE_TYPE ?? {};

export const DownloadDashboard = (props: any) => {
  const { isDownloading, downloadReport } = useDownloadDashboard?.(props);

  return (
    <Box
      display={'flex'}
      flexWrap={'wrap'}
      alignItems={'center'}
      gap={2}
      my={2}
    >
      <LoadingButton
        className="small"
        variant="contained"
        disabled={isDownloading?.isLoading}
        onClick={() => downloadReport?.(PDF)}
        loading={isDownloading?.isPng === PDF}
      >
        Download as PDF
      </LoadingButton>
      <LoadingButton
        className="small"
        variant="contained"
        disabled={isDownloading?.isLoading}
        loading={isDownloading?.isPng === PNG}
        onClick={() => downloadReport?.(PNG)}
      >
        Download as PNG
      </LoadingButton>
    </Box>
  );
};
