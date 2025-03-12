import { ExportModal } from '@/components/ExportModal';
import { useExportReport } from './useExportReport';

const ExportReport = () => {
  const {
    isPortalOpen,
    handleFileExportSubmit,
    closeModal,
    lazyExportReportsListStatus,
  } = useExportReport();
  return (
    <ExportModal
      open={isPortalOpen?.isOpen}
      onSubmit={handleFileExportSubmit}
      handleClose={closeModal}
      loading={lazyExportReportsListStatus?.isLoading}
      disableCancelBtn={lazyExportReportsListStatus?.isLoading}
    />
  );
};

export default ExportReport;
