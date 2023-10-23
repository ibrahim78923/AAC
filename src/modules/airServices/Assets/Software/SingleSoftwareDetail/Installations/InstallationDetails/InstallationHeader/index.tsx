import { Button, Box } from '@mui/material';
import Search from '@/components/Search';
import { AlertModals } from '@/components/AlertModals';
import { useInstallation } from '../../useInstallations';
import AddDevice from '../../addDevice';
import { ExportButton } from '@/modules/airServices/common/Buttons/ExportButton';

const DELETE_MESSAGE = 'Are you sure you want to delete this Associate Asset?';
const MODAL_TYPE = 'delete';
export const InstallationHeader = ({ activeCheck }: any) => {
  const { deleteModal, setDeleteModal, submitDeleteModel, handleMenuExport } =
    useInstallation();
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
            disabled={!!!activeCheck.length}
            onClick={() => setDeleteModal(true)}
          >
            Remove Device
          </Button>
          <ExportButton
            handleCsvExport={handleMenuExport}
            handleExcelExport={handleMenuExport}
          />
          <AddDevice
          // // isModalOpen={false}
          // setIsmodalOpen={{}}
          // onSubmit={() => {}}
          // options={[]}
          />
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
