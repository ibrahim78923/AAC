import { Box, Button, Typography } from '@mui/material';
import { userList, powerDialerListTableData } from './PowerDialerList.data';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { FilterLinesIcon } from '@/assets/icons';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { usePowerDialerList } from './usePowerDialerList';
import CreatePowerDialerModal from '../CreatePowerDialer';
import FilterAllCalls from './FilterAllCalls';

export const PowerDialerList = () => {
  const {
    theme,
    search,
    setSearch,
    buttonName,
    setButtonName,
    powerDialerModal,
    setPowerDialerModal,
    isDrawerOpen,
    setIsDrawerOpen,
  } = usePowerDialerList();
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
            Power Dialer List
          </Typography>
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
            <Box
              display={'flex'}
              flexWrap={'wrap'}
              gap={1}
              sx={{ width: { sm: 'auto', xs: '100%' } }}
            >
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<AddCircleIcon />}
                onClick={() => setPowerDialerModal(true)}
                sx={{ width: { sm: 'auto', xs: '100%' } }}
              >
                Add New List
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<FilterLinesIcon />}
                onClick={() => setIsDrawerOpen(true)}
                sx={{ width: { sm: 'auto', xs: '100%' } }}
              >
                Filters
              </Button>
            </Box>
          </Box>
          <TanstackTable
            data={powerDialerListTableData}
            columns={userList(buttonName, setButtonName)}
            isPagination
          />
        </Box>
      </Box>
      <CreatePowerDialerModal
        powerDialerModal={powerDialerModal}
        setPowerDialerModal={setPowerDialerModal}
      />
      <FilterAllCalls
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </>
  );
};
