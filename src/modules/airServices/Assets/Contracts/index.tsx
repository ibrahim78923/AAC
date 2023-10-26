import { Box } from '@mui/material';
import { data, columns } from './Contracts.data';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { Button } from '@mui/material';
import { FilterSharedIcon } from '@/assets/icons';
import ContractsDrawerForm from './ContractsDrawerForm';
import { AlertModals } from '@/components/AlertModals';
import { useContracts } from './useContracts';
import { ExportButton } from '../../../../components/ExportButton';
import { PageTitledHeader } from '../../../../components/PageTitledHeader';

function Contracts() {
  const {
    meetingsData,
    setMeetingsData,
    isDrawerOpen,
    setIsDrawerOpen,
    openModel,
    setOpenModel,
    theme,
    handleAddNewContractClick,
    handleSubmitModel,
    router,
  } = useContracts();
  return (
    <>
      <PageTitledHeader
        title={'Contracts'}
        addTitle={'Add New Contract'}
        handleAction={handleAddNewContractClick}
      />
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={2}
      >
        <Box>
          <Search label="search" width="100%" />
        </Box>

        <Box display={'flex'} alignItems={'center'} gap={2} flexWrap={'wrap'}>
          <Button
            variant="outlined"
            color="secondary"
            disabled={!!!meetingsData.length}
            onClick={() => setOpenModel(true)}
          >
            Delete
          </Button>
          <ExportButton />
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<FilterSharedIcon />}
            onClick={() => setIsDrawerOpen(true)}
          >
            Filter
          </Button>
        </Box>
      </Box>
      <br />
      <Box sx={{ marginBottom: '25px' }}>
        <TanstackTable
          data={data}
          columns={columns(meetingsData, setMeetingsData, data, theme, router)}
        />
      </Box>
      <Box>
        <AlertModals
          open={openModel}
          type={'delete'}
          message="Are you sure want to delete this Contract?"
          handleClose={() => setOpenModel(false)}
          handleSubmit={handleSubmitModel}
        />
      </Box>
      <Box>
        <ContractsDrawerForm
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      </Box>
    </>
  );
}

export default Contracts;
