import { Box, Typography, Button, Grid, Stack } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './RolesRight.data';
import useRoleAndRight from './useRoleAndRight';
import Search from '@/components/Search';
import ActionButton from './ActionButton';
import AddRoleDrawer from './AddRoleDrawer';

const RolesRight = () => {
  const {
    handleCloseDrawer,
    setIsDraweropen,
    setIsOpenDelete,
    setFilterValues,
    setCheckedRows,
    getPermissions,
    isDraweropen,
    filterValues,
    setPageLimit,
    checkedRows,
    setPage,
    theme,
    isLoading,
    isSuccess,
  } = useRoleAndRight();

  const columnsProps = {
    checkedRows: checkedRows,
    setCheckedRows: setCheckedRows,
  };
  const columnParams = columns(columnsProps);

  return (
    <>
      <Box
        sx={{
          border: `1px solid ${theme?.palette?.grey[700]}`,
          padding: '1rem',
          boxShadow: '0px 1px 2px 0px #1018280F',
          borderRadius: '8px',
        }}
      >
        <Stack
          direction={{ sm: 'row', xs: 'column' }}
          justifyContent="space-between"
          gap={1}
        >
          <Typography variant="h3">Roles and Rights</Typography>
          <Button
            className="small"
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={() => setIsDraweropen({ isToggle: true, type: 'add' })}
          >
            Add New Role
          </Button>
        </Stack>
        <Stack
          direction={{ sm: 'row', xs: 'column' }}
          justifyContent="space-between"
          gap={1}
          my={2}
        >
          <Search
            placeholder="Search Here"
            size="small"
            onChange={(e: any) => {
              setFilterValues({ ...filterValues, search: e?.target?.value });
            }}
          />

          <ActionButton
            checkedRows={checkedRows}
            setIsDraweropen={setIsDraweropen}
            setIsOpenDelete={setIsOpenDelete}
          />
        </Stack>
        <Grid>
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
        </Grid>
      </Box>
      {isDraweropen?.isToggle && (
        <AddRoleDrawer
          isDrawerOpen={isDraweropen}
          setIsDraweropen
          onClose={handleCloseDrawer}
          getPermissionsData={getPermissions}
        />
      )}
    </>
  );
};

export default RolesRight;
