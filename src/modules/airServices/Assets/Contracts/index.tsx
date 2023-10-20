import { Box, Grid, MenuItem, Popover } from '@mui/material';
import { data, columns } from './Contracts.data';
import TanstackTable from '@/components/Tabel/TanstackTable';
import Search from '@/components/Search';
import { Button } from '@mui/material';
import { FilterSharedIcon, ExportShared } from '@/assets/icons';
import { styles } from './Contracts.style';
import AssetHead from '../Header/index';
import ContractsDrawerForm from './ContractsDrawerForm';
import { AlertModals } from '@/components/AlertModals';
import { useContracts } from './useContracts';

function Contracts() {
  const {
    meetingsData,
    setMeetingsData,
    isDrawerOpen,
    setIsDrawerOpen,
    openModel,
    setOpenModel,
    actionPop,
    theme,
    handleAddNewContractClick,
    handleActionClick,
    handleActionClose,
    openAction,
    handleSubmitModel,
  } = useContracts();
  return (
    <>
      <Grid container>
        <AssetHead
          title={'Contracts'}
          addTitle={'Add New Contract'}
          handleAction={handleAddNewContractClick}
        />
        <Grid item sx={styles.gridItems}>
          <Box sx={styles.headBox}>
            <Box sx={{ marginLeft: '24px' }}>
              <Search label="search" width="100%" />
            </Box>
            <Box sx={styles.buttonBox}>
              <Button
                sx={styles.buttonStyle(theme)}
                variant="outlined"
                disabled={!!!meetingsData.length}
                onClick={() => setOpenModel(true)}
              >
                Delete
              </Button>
              <Button
                sx={styles.exportButtonStyle(theme)}
                variant="outlined"
                startIcon={<ExportShared />}
                onClick={handleActionClick}
              >
                Export
              </Button>
              <Popover
                open={openAction}
                anchorEl={actionPop}
                onClose={handleActionClose}
                sx={{
                  mt: '4px',
                  '& .MuiPaper-root': { width: { md: '5%', xs: '25%' } },
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <MenuItem sx={{ py: 1 }}>CSV</MenuItem>
                <MenuItem sx={{ py: 1 }}>Excel</MenuItem>
              </Popover>
              <Button
                sx={styles.buttonStyle(theme)}
                variant="outlined"
                startIcon={<FilterSharedIcon />}
                onClick={() => setIsDrawerOpen(true)}
              >
                Filter
              </Button>
            </Box>
          </Box>
          <Box sx={{ marginBottom: '25px' }}>
            <TanstackTable
              data={data}
              columns={columns(meetingsData, setMeetingsData, data, theme)}
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
        </Grid>
      </Grid>
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
