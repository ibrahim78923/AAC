import { Button, Box } from '@mui/material';
import Search from '@/components/Search';
import { AlertModals } from '@/components/AlertModals';
import { ExportButton } from '@/components/ExportButton';
import AddDevice from '../../AddDevice';
import { useInstallationHeader } from './useInstallationHeader';
import { ALERT_MODALS_TYPE, EXPORT_TYPE } from '@/constants/strings';

const DELETE_MESSAGE = 'Are you sure you want to delete selected Device?';

export const InstallationHeader = (props: any) => {
  const { activeCheck, searchBy, setSearchBy, getInstallationListDataExport } =
    props;
  const {
    deleteModal,
    setDeleteModal,
    submitDeleteModel,
    isLoading,
    handleOpenDelete,
  } = useInstallationHeader(props);
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={2}
      >
        <Box>
          <Search
            label="Search Here"
            searchBy={searchBy}
            setSearchBy={setSearchBy}
          />
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={2}>
          <Button
            color="secondary"
            variant="outlined"
            disabled={!!!activeCheck?.length}
            onClick={handleOpenDelete}
          >
            Remove Device
          </Button>
          <ExportButton
            handleCsvExport={() =>
              getInstallationListDataExport(EXPORT_TYPE?.CSV)
            }
            handleExcelExport={() =>
              getInstallationListDataExport(EXPORT_TYPE?.XLS)
            }
          />
          <AddDevice />
        </Box>
      </Box>
      <AlertModals
        open={deleteModal}
        message={DELETE_MESSAGE}
        handleClose={() => setDeleteModal(false)}
        handleSubmitBtn={submitDeleteModel}
        type={ALERT_MODALS_TYPE?.DELETE}
        loading={isLoading}
      />
    </>
  );
};
