import { Box, Button, Tooltip, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { UserList, settlementsTableData } from './Settlements.data';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { useState } from 'react';
import { ExportIcon, FilterLinesIcon } from '@/assets/icons';
import { AntSwitch } from '@/components/AntSwitch';
import { SettlementsFilterDrawer } from './SettlementsFilterDrawer';

export const Settlements = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1}
      >
        <Typography variant="h3" color="slateBlue.main">
          Settlements
        </Typography>
        <Box display={'flex'} flexWrap={'wrap'} gap={1} alignItems={'center'}>
          <Tooltip
            title="Enable/Disable Settlements"
            disableInteractive
            placement="top"
          >
            <ErrorIcon color="action" fontSize="small" />
          </Tooltip>
          <AntSwitch values={true} />
        </Box>
      </Box>
      <br />
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
          setSearchBy={setSearchValue}
          searchBy={searchValue}
        />
        <Box display={'flex'} flexWrap={'wrap'} gap={2}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<FilterLinesIcon />}
            sx={{ borderRadius: '0.5rem' }}
            onClick={() => setDrawerOpen(true)}
          >
            Filters
          </Button>
          <Button variant="outlined" color="inherit" startIcon={<ExportIcon />}>
            Export
          </Button>
        </Box>
      </Box>
      <Box mt={2}>
        <TanstackTable
          data={settlementsTableData}
          columns={UserList}
          isPagination
        />
      </Box>
      <SettlementsFilterDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
    </Box>
  );
};
