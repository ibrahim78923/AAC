import React, { useState } from 'react';

import { Box, Button, useTheme } from '@mui/material';

import Search from '@/components/Search';
import { ExportIcon, FilterIcon } from '@/assets/icons';
import { styles } from './allCalls.style';
import TanstackTable from '@/components/Table/TanstackTable';
import { allCallsData, columns } from './allCalls.data';

const AllCalls = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();

  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);

  const getColumns = columns();

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Box sx={styles?.searchBar}>
          <Search
            searchBy={searchTerm}
            setSearchBy={setSearchTerm}
            label="Search By Name"
            fullWidth
            size="small"
          />
        </Box>
        <Box sx={styles?.flexActionsButtons}>
          <Button
            variant="outlined"
            className="small"
            color="inherit"
            sx={{
              color: theme?.palette?.custom['main'],
              width: { xs: '100%', sm: '108px', md: '108px', lg: '108px' },
            }}
          >
            <ExportIcon />
            &nbsp; Export
          </Button>
          <Button
            variant="outlined"
            className="small"
            color="inherit"
            sx={{
              color: theme?.palette?.custom['main'],
              width: { xs: '100%', sm: '95px', md: '95px', lg: '95px' },
            }}
          >
            <FilterIcon />
            &nbsp; Filter
          </Button>
        </Box>
      </Box>

      <TanstackTable
        columns={getColumns}
        data={allCallsData}
        setPage={setPage}
        setPageLimit={setPageLimit}
        isPagination
        // isLoading={isLoading}
        currentPage={page}
        // count={Calls?.meta?.total}
        pageLimit={pageLimit}
        // totalRecords={Calls?.meta?.total}
        // isSuccess={true}
        // onPageChange={(page: any) => setPage(page)}
      />
    </Box>
  );
};

export default AllCalls;
