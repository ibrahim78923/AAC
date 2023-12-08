import { Box, Button, Card, Typography } from '@mui/material';

import Search from '@/components/Search';
import CustomPagination from '@/components/CustomPagination';
import TanstackTable from '@/components/Table/TanstackTable';
import { ORG_ADMIN } from '@/constants';

import { columns } from './RoleAndRights.data';
import useRolesAndRights from './useRolesAndRights';
import RoleFilters from './RoleFilters';

import { FilterSharedIcon, PlusIcon } from '@/assets/icons';
import ActionButton from '@/modules/superAdmin/UserManagement/ActionButton';

const RolesAndRights = () => {
  const {
    navigate,
    theme,
    isOpenFilterDrawer,
    setIsOpenFilterDrawer,
    getPermissions,
    checkedRows,
    setCheckedRows,
    filterValues,
    setFilterValues,
    setPageLimit,
    setPage,
  } = useRolesAndRights();

  const columnsProps = {
    checkedRows: checkedRows,
    setCheckedRows: setCheckedRows,
  };
  const columnParams = columns(columnsProps);

  return (
    <Card sx={{ pt: '24px' }}>
      <Box
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: '0px 24px', display: { md: 'flex' } }}
      >
        <Typography variant="h3">Roles and Rights</Typography>
        <Button
          className="small"
          onClick={() => {
            navigate.push(ORG_ADMIN?.ADD_ROLE);
          }}
          variant="contained"
          startIcon={<PlusIcon />}
        >
          Add Role
        </Button>
      </Box>
      <Box
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: '0px 24px', display: { md: 'flex' }, my: 2 }}
      >
        <Search
          placeholder="Search Here"
          size="small"
          onChange={(e: any) => {
            setFilterValues({ ...filterValues, search: e?.target?.value });
          }}
        />
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <ActionButton checkedRows={checkedRows} />
          <Button
            onClick={() => {
              setIsOpenFilterDrawer(true);
            }}
            startIcon={<FilterSharedIcon />}
            sx={{
              border: `1px solid ${theme?.palette?.custom?.dark}`,
              color: theme?.palette?.custom?.main,
              width: '95px',
              height: '36px',
            }}
          >
            Filter
          </Button>
        </Box>
      </Box>

      <TanstackTable
        columns={columnParams}
        data={getPermissions?.data?.companyaccountroles}
        totalRecords={getPermissions?.data?.meta?.total}
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
        count={getPermissions?.data?.meta?.pages}
      />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />

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
