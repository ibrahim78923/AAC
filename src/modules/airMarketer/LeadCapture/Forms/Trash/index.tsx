import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from '../Forms.data';
import Search from '@/components/Search';
import { Box, useTheme } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_LEAD_CAPTURE_FORM_PERMISSIONS } from '@/constants/permission-keys';
import useTrash from './useDraft';

const Trash = ({ setShowSignUpForm, setFindStatus }: any) => {
  const theme = useTheme();
  const {
    setSearchValue,
    loadingGetForms,
    dataGetForms,
    setPageLimit,
    setPage,
  } = useTrash();
  const getColums = columns(setShowSignUpForm, setFindStatus, theme);
  return (
    <Box
      sx={{
        border: '1px solid #EAECF0',
        borderRadius: '8px',
        padding: '12px 16px',
      }}
    >
      <Box sx={{ mb: '12px' }}>
        <PermissionsGuard
          permissions={[AIR_MARKETER_LEAD_CAPTURE_FORM_PERMISSIONS?.SEARCH]}
        >
          <Search
            setSearchBy={setSearchValue}
            label="Search Here"
            size="small"
          />
        </PermissionsGuard>
      </Box>
      <TanstackTable
        columns={getColums}
        data={dataGetForms?.data?.leadcaptureforms}
        isLoading={loadingGetForms}
        currentPage={dataGetForms?.data?.meta?.page}
        count={dataGetForms?.data?.meta?.pages}
        pageLimit={dataGetForms?.data?.meta?.limit}
        totalRecords={dataGetForms?.data?.meta?.total}
        setPage={setPage}
        setPageLimit={setPageLimit}
        onPageChange={(page: any) => setPage(page)}
        isPagination
      />
    </Box>
  );
};

export default Trash;
