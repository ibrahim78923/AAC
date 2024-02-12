import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './AllForms.data';
import Search from '@/components/Search';
import { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { AllFormsTableData } from '@/mock/modules/airMarketer/LeadCapture/Forms';

const AllForms = ({ setShowSignUpForm, setFindStatus }: any) => {
  const [searchByClientName, setSearchByClientName] = useState('');
  const theme = useTheme();
  const getColums = columns(setShowSignUpForm, setFindStatus, theme);

  return (
    <Box
      sx={{
        border: '1px solid #EAECF0',
        borderRadius: '8px',
        padding: '12px  16px',
      }}
    >
      <Box marginBottom="12px">
        <Search
          searchBy={searchByClientName}
          setSearchBy={setSearchByClientName}
          label="Search Here"
          size="small"
        />
      </Box>
      <TanstackTable
        columns={getColums}
        data={AllFormsTableData}
        isPagination
      />
    </Box>
  );
};

export default AllForms;
