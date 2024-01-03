import {
  Box,
  Typography,
  Button,
  Grid,
  // Accordion,
  // AccordionSummary,
  // AccordionDetails,
  // Switch,
  // Checkbox,
  // FormGroup,
  // FormControlLabel,
  Stack,
} from '@mui/material';

// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddCircleIcon from '@mui/icons-material/AddCircle';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// import { FormProvider } from '@/components/ReactHookForm';
// import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Table/TanstackTable';

// import { AlertModals } from '@/components/AlertModals';

import {
  columns,
  // dataArray,
  // permissionArr
} from './RolesRight.data';
import useRoleAndRight from './useRoleAndRight';

// import { v4 as uuidv4 } from 'uuid';
import Search from '@/components/Search';
import ActionButton from './ActionButton';
// import PermissionsAccordion from './PermissionsAccordion';
import AddRoleDrawer from './AddRoleDrawer';

const RolesRight = () => {
  const {
    handleCloseDrawer,
    setIsDraweropen,
    setIsOpenDelete,
    setFilterValues,
    setCheckedRows,
    getPermissions,
    // handleChange,
    isDraweropen,
    // isOpenDelete,
    filterValues,
    setPageLimit,
    checkedRows,
    // expanded,
    setPage,
    // methods,
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
            placeholder="Search by Role Name"
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

      {/* {isOpenDelete && (
        <AlertModals
          message={'Are you sure you want to delete this role?'}
          type={'delete'}
          open={isOpenDelete}
          handleClose={() => setIsOpenDelete(false)}
          handleSubmit={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      )} */}

      {isDraweropen?.isToggle && (
        <AddRoleDrawer
          isDrawerOpen={isDraweropen}
          onClose={handleCloseDrawer}
          getPermissionsData={getPermissions}
        />
      )}
    </>
  );
};

export default RolesRight;
