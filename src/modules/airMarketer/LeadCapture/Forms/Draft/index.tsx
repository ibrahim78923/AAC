import CustomPagination from '@/components/CustomPagination';

import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './Draft.data';
import Search from '@/components/Search';
import { useState } from 'react';
import { Box } from '@mui/material';
import { DraftTableData } from '@/mock/modules/airMarketer/LeadCapture/Forms';

const Draft = ({ setShowSignUpForm, setFindStatus }: any) => {
  const [searchByClientName, setSearchByClientName] = useState('');
  const getColums = columns(setShowSignUpForm, setFindStatus);

  return (
    <Box
      sx={{
        border: '1px solid #EAECF0',
        borderRadius: '8px',
        padding: '12px 16px',
      }}
    >
      <Search
        searchBy={searchByClientName}
        setSearchBy={setSearchByClientName}
        label="Search Here"
        size="small"
      />
      <Box marginTop="12px">
        <TanstackTable columns={getColums} data={DraftTableData} />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Box>
    </Box>
  );
};

export default Draft;
