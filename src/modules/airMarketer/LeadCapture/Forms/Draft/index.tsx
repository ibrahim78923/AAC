import CustomPagination from '@/components/CustomPagination';

import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './Draft.data';
import Search from '@/components/Search';
import { useState } from 'react';
import { Box, Divider } from '@mui/material';
import { DraftTableData } from '@/mock/modules/airMarketer/LeadCapture/Forms';

const Draft = ({ setShowSignUpForm, setFindStatus }: any) => {
  const [searchByClientName, setSearchByClientName] = useState('');
  const getColums = columns(setShowSignUpForm, setFindStatus);

  return (
    <Box
      sx={{
        border: '1px solid #EAECF0',
        borderRadius: '8px',
      }}
    >
      <Search
        searchBy={searchByClientName}
        setSearchBy={setSearchByClientName}
        label="Search Here"
        size="small"
        sx={{ margin: '15px' }}
      />
      <Divider sx={{ marginBottom: '15px' }} />
      <TanstackTable columns={getColums} data={DraftTableData} />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </Box>
  );
};

export default Draft;
