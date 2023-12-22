import { Box, Button, Card, Stack, Tooltip, Typography } from '@mui/material';

import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { ORG_ADMIN } from '@/constants';

import { columns } from './RoleAndRights.data';
import useRolesAndRights from './useRolesAndRights';
import RoleFilters from './RoleFilters';

import { FilterSharedIcon, PlusIcon, RefreshTasksIcon } from '@/assets/icons';
import ActionButton from './ActionButton';

const RolesAndRights = () => {
  const {
    navigate,
    isOpenFilterDrawer,
    setIsOpenFilterDrawer,
    getPermissions,
    checkedRows,
    setCheckedRows,
    filterValues,
    setFilterValues,
    setPageLimit,
    setPage,
    resetFilters,
    updateStatus,
    isSuccess,
    isLoading,
  } = useRolesAndRights();

  const columnsProps = {
    updateStatus: updateStatus,
    checkedRows: checkedRows,
    setCheckedRows: setCheckedRows,
  };

  const columnParams = columns(columnsProps);
  return (
    <Card sx={{ pt: '24px' }}>
      <Stack
        justifyContent="space-between"
        sx={{ padding: '0px 24px' }}
        direction={{ sm: 'row' }}
        gap={1}
      >
        <Typography variant="h3">Roles and Rights</Typography>

        <Button
          className="small"
          variant="contained"
          startIcon={<PlusIcon />}
          sx={{ width: { sm: '121px', xs: '100%' } }}
          onClick={() => {
            navigate.push({
              pathname: ORG_ADMIN?.ADD_ROLE,
              query: { type: 'add' },
            });
          }}
        >
          Add Role
        </Button>
      </Stack>

      <Stack
        direction={{ sm: 'row' }}
        justifyContent="space-between"
        gap={1}
        sx={{ padding: '0px 24px', my: 2 }}
      >
        <Box>
          <Search
            placeholder="Search by Role Name"
            size="small"
            onChange={(e: any) => {
              setFilterValues({ ...filterValues, search: e?.target?.value });
            }}
          />
        </Box>

        <Stack direction="row" gap={1} sx={{ flexWrap: 'wrap' }}>
          <ActionButton checkedRows={checkedRows} />

          <Tooltip title={'Refresh Filter'}>
            <Button
              sx={{ width: { xs: '100%', sm: '50px' } }}
              variant="outlined"
              color="inherit"
              className="small"
              onClick={resetFilters}
            >
              <RefreshTasksIcon />
            </Button>
          </Tooltip>

          <Button
            className="small"
            variant="outlined"
            color="inherit"
            onClick={() => {
              setIsOpenFilterDrawer(true);
            }}
            startIcon={<FilterSharedIcon />}
            sx={{ width: { sm: '95px', xs: '100%' } }}
          >
            Filter
          </Button>
        </Stack>
      </Stack>

      <TanstackTable
        columns={columnParams}
        data={getPermissions?.data?.companyaccountroles}
        totalRecords={getPermissions?.data?.meta?.total}
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
        count={getPermissions?.data?.meta?.pages}
        isPagination
        pageLimit={getPermissions?.data?.meta?.limit}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />

      {isOpenFilterDrawer && (
        <RoleFilters
          filterVal={filterValues}
          setFilterVal={setFilterValues}
          isOpen={isOpenFilterDrawer}
          setIsOpen={() => {
            setIsOpenFilterDrawer(false);
          }}
        />
      )}
    </Card>
  );
};

export default RolesAndRights;
