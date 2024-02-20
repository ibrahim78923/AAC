import React, { useState } from 'react';

import { Box, Button, useTheme } from '@mui/material';

import Search from '@/components/Search';
import { ExportIcon, FilterIcon } from '@/assets/icons';
import { styles } from './allCalls.style';
import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './allCalls.data';
import { UserDefault, UserProfileVectorImage } from '@/assets/images';

const AllCalls = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();

  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);

  const getColumns = columns();

  const allCallsData = [
    {
      id: '01',
      customerDetails: {
        profileAvatar: UserProfileVectorImage,
        name: 'Eleanor Pena',
        callType: 'missed',
      },
      assignedDetails: {
        profileAvatar: UserDefault,
        name: 'Global Queue',
      },
      virtualNumber: '+12314 1414 1312 4',
      callTags: '-',
      callDuration: '00:42',
      dateAndTime: '11 Dec, 2023,  7:48 PM',
    },
    {
      id: '02',
      customerDetails: {
        profileAvatar: UserProfileVectorImage,
        name: 'Courtney ',
        callType: 'completed',
      },
      assignedDetails: {
        profileAvatar: UserDefault,
        name: 'Global Queue',
      },
      virtualNumber: '+12314 1414 1312 4',
      callTags: '-',
      callDuration: '00:42',
      dateAndTime: '11 Dec, 2023,  7:48 PM',
    },
    {
      id: '03',
      customerDetails: {
        profileAvatar: UserProfileVectorImage,
        name: 'Jerome Bell',
        callType: 'successful_callback',
      },
      assignedDetails: {
        profileAvatar: UserDefault,
        name: 'Global Queue',
        category: 'Medical Helpline',
      },
      virtualNumber: '+12314 1414 1312 4',
      callTags: '-',
      callDuration: '00:42',
      dateAndTime: '11 Dec, 2023,  7:48 PM',
    },
    {
      id: '04',
      customerDetails: {
        profileAvatar: UserProfileVectorImage,
        name: 'Annette Black',
        callType: 'unsuccessful_callback',
      },
      assignedDetails: {
        profileAvatar: UserDefault,
        name: 'Global Queue',
        category: 'Medical Helpline',
      },
      virtualNumber: '+12314 1414 1312 4',
      callTags: '-',
      callDuration: '00:42',
      dateAndTime: '11 Dec, 2023,  7:48 PM',
    },
    {
      id: '05',
      customerDetails: {
        profileAvatar: UserProfileVectorImage,
        name: 'Eleanor Pena',
        callType: 'abandoned_ringing',
      },
      assignedDetails: {
        profileAvatar: UserDefault,
        name: 'Global Queue',
        category: 'Medical Helpline',
      },
      virtualNumber: '+12314 1414 1312 4',
      callTags: '-',
      callDuration: '00:42',
      dateAndTime: '11 Dec, 2023,  7:48 PM',
    },
  ];

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
        <Box sx={styles.searchBar}>
          <Search
            searchBy={searchTerm}
            setSearchBy={setSearchTerm}
            label="Search By Name"
            fullWidth
            size="small"
          />
        </Box>
        <Box sx={styles.flexActionsButtons}>
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
