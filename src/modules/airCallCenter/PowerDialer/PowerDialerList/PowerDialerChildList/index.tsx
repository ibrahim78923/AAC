import { Box, Button, Typography } from '@mui/material';
import { UserList, transactionTableData } from './PowerDialerChildList.data';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ExportButton } from '@/components/ExportButton';
import { usePowerDialerChildList } from './usePowerDialerChildList';
import CreatePowerDialerModal from '../../CreatePowerDialer';
import PowerDialerDialog from '../../PowerDialerDialog';

export const PowerDialerChildList = () => {
  const {
    theme,
    search,
    setSearch,
    buttonName,
    setButtonName,
    selectedData,
    setSelectedData,
    powerDialerModal,
    setPowerDialerModal,
    startPowerDialerModal,
    setStartPowerDialerModal,
  } = usePowerDialerChildList();
  return (
    <>
      <Box
        sx={{
          border: `.1rem solid ${theme?.palette?.grey[700]}`,
          borderRadius: '8px',
        }}
      >
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          m={2}
        >
          <Typography variant="h3" color="slateBlue.main">
            Power Dialer List (Sales)
          </Typography>
          <Box
            display={'flex'}
            flexWrap={'wrap'}
            gap={1}
            sx={{ width: { lg: 'auto', xs: '100%' } }}
            mt={1}
          >
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<AddCircleIcon />}
              onClick={() => setPowerDialerModal(true)}
              sx={{ width: { lg: 'auto', xs: '100%' } }}
            >
              Add from contacts
            </Button>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => setStartPowerDialerModal(true)}
              sx={{ width: { lg: 'auto', xs: '100%' } }}
            >
              Start Power Dialing
            </Button>
          </Box>
        </Box>
        <br />
        <Box>
          <Box
            m={1}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            flexWrap={'wrap'}
            gap={1}
          >
            <Search
              label="Search Here"
              width={'16.25rem'}
              setSearchBy={setSearch}
              searchBy={search}
            />
            <Box display={'flex'} flexWrap={'wrap'} gap={2}>
              <ExportButton />
            </Box>
          </Box>
          <TanstackTable
            data={transactionTableData}
            columns={UserList(
              selectedData,
              setSelectedData,
              transactionTableData,
              buttonName,
              setButtonName,
            )}
            isPagination
          />
        </Box>
      </Box>
      <CreatePowerDialerModal
        powerDialerModal={powerDialerModal}
        setPowerDialerModal={setPowerDialerModal}
      />
      <PowerDialerDialog
        powerDialerModal={startPowerDialerModal}
        setPowerDialerModal={setStartPowerDialerModal}
      />
    </>
  );
};
