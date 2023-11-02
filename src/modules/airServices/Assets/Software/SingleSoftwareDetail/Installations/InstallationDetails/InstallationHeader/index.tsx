import { Button, Box } from '@mui/material';
import Search from '@/components/Search';
import { AlertModals } from '@/components/AlertModals';
import { ExportButton } from '@/components/ExportButton';
import AddDevice from '../../AddDevice';
import { useInstallationHeader } from './useInstallationHeader';

const DELETE_MESSAGE = 'Are you sure you want to delete this Associate Asset?';
const MODAL_TYPE = 'delete';
export const InstallationHeader = ({ activeCheck }: any) => {
  const { deleteModal, setDeleteModal, submitDeleteModel, handleMenuExport } =
    useInstallationHeader();
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
          <Search label="Search" searchBy="" setSearchBy="" />
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={2}>
          <Button
            color="secondary"
            variant="outlined"
            disabled={!!!activeCheck?.length}
            onClick={() => setDeleteModal(true)}
          >
            Remove Device
          </Button>
          <ExportButton
            handleCsvExport={handleMenuExport}
            handleExcelExport={handleMenuExport}
          />
          <AddDevice />
        </Box>
      </Box>
      <AlertModals
        open={deleteModal}
        message={DELETE_MESSAGE}
        handleClose={() => setDeleteModal(false)}
        handleSubmit={submitDeleteModel}
        type={MODAL_TYPE}
      />
    </>
  );
};
