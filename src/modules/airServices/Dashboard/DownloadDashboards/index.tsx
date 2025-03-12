import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { DownloadDashboard } from '../DownloadDashboard';
import { Box } from '@mui/material';

const DownloadDashboards = (props: any) => {
  const { setIsPortalOpen, isPortalOpen, dashboardName, downloadRef } = props;

  const closePortal = () => setIsPortalOpen?.({ isOpen: false, action: '' });

  return (
    <CustomCommonDialog
      isPortalOpen={isPortalOpen?.isOpen}
      closePortal={closePortal}
      dialogTitle="Download Dashboard"
      showActionButtons={false}
      dialogMaxWidth={'xs'}
    >
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <DownloadDashboard name={dashboardName} downloadRef={downloadRef} />
      </Box>
    </CustomCommonDialog>
  );
};

export default DownloadDashboards;
