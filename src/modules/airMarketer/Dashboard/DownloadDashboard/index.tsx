import { DOWNLOAD_FILE_TYPE } from '@/constants/strings';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import { useDownloadDashboard } from './useDownloadDashboard';
import CommonModal from '@/components/CommonModal';

const { PNG, PDF } = DOWNLOAD_FILE_TYPE ?? {};

export const DownloadDashboard = (props: any) => {
  const { isDownloadDashboad, setIsDownloadDashboard, name, downloadRef } =
    props;
  const { isDownloading, downloadReport } = useDownloadDashboard?.(
    name,
    downloadRef,
  );

  return (
    <CommonModal
      title={'Download Dashboard'}
      open={isDownloadDashboad}
      handleClose={() => setIsDownloadDashboard(false)}
      handleCancel={() => setIsDownloadDashboard(false)}
    >
      <Box display={'flex'} flexWrap={'wrap'} gap={2} my={2}>
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
    </CommonModal>
  );
};
