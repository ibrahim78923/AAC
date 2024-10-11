import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import Search from '@/components/Search';
import { AIR_SERVICES_SIGNUP_LEADS_PERMISSION } from '@/constants/permission-keys';
import { Grid } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import useSignUpLeads from './useSignUpLeads';

export const SignUpLeads = () => {
  const {
    data,
    signUpLeadsColumns,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    setPageLimit,
    setPage,
    handleSearch,
  } = useSignUpLeads();

  return (
    <>
      <PageTitledHeader title={'Signup Leads'} />
      <Grid container justifyContent={'space-between'} rowSpacing={4}>
        <Grid item xs={12} md={6}>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_SIGNUP_LEADS_PERMISSION?.SIGNUP_LEADS_SEARCH,
            ]}
          >
            <Search label="Search Here" setSearchBy={handleSearch} />
          </PermissionsGuard>
        </Grid>

        <Grid item xs={12}>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_SIGNUP_LEADS_PERMISSION?.SIGNUP_LEADS_LIST,
            ]}
          >
            <TanstackTable
              data={data?.data?.contacts}
              columns={signUpLeadsColumns}
              isPagination
              isLoading={isLoading}
              isError={isError}
              isFetching={isFetching}
              isSuccess={isSuccess}
              setPageLimit={setPageLimit}
              setPage={setPage}
              currentPage={data?.data?.meta?.page}
              count={data?.data?.meta?.pages}
              pageLimit={data?.data?.meta?.limit}
              totalRecords={data?.data?.meta?.total}
              onPageChange={(page: number) => setPage(page)}
            />
          </PermissionsGuard>
        </Grid>
      </Grid>
    </>
  );
};
export default SignUpLeads;
