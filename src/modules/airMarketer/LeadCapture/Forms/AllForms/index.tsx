import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './AllForms.data';
import Search from '@/components/Search';
import { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { AllFormsTableData } from '@/mock/modules/airMarketer/LeadCapture/Forms';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_LEAD_CAPTURE_FORM_PERMISSIONS } from '@/constants/permission-keys';

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
        <PermissionsGuard
          permissions={[AIR_MARKETER_LEAD_CAPTURE_FORM_PERMISSIONS?.SEARCH]}
        >
          <Search
            searchBy={searchByClientName}
            setSearchBy={setSearchByClientName}
            label="Search Here"
            size="small"
          />
        </PermissionsGuard>
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
