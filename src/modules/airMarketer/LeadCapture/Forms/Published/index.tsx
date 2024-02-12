import CustomPagination from '@/components/CustomPagination';

import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './Published.data';
import Search from '@/components/Search';
import { useState } from 'react';
import { Box } from '@mui/material';
import { PublishedTableData } from '@/mock/modules/airMarketer/LeadCapture/Forms';

const Published = ({ setShowSignUpForm, setFindStatus }: any) => {
  const [searchByClientName, setSearchByClientName] = useState('');
  const getColums = columns(setShowSignUpForm, setFindStatus);
  return (
    <Box
      sx={{
        border: '1px solid #EAECF0',
        borderRadius: '8px',
        padding: '16px 12px',
      }}
    >
      <Box mb="12px">
        <Search
          searchBy={searchByClientName}
          setSearchBy={setSearchByClientName}
          label="Search Here"
          size="small"
        />
      </Box>
      <TanstackTable columns={getColums} data={PublishedTableData} />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </Box>
  );
};

export default Published;
