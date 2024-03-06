import { Box, Button, Grid, Typography } from '@mui/material';
import { ArrowLeftIcon, PlusSharedColorIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { useDepartmentsHeader } from './useDepartmentsHeader';
import { DepartmentsFormModal } from '../DepartmentsFormModal';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

export const DepartmentsHeader = (props: any) => {
  const { searchBy, setSearchBy, openAddModal, setOpenAddModal } = props;
  const {
    backArrowClick,
    formSubmit,
    userList,
    addFormMethod,
    handleClose,
    isLoading,
  } = useDepartmentsHeader(props);
  return (
    <>
      <Grid
        container
        alignItems={'center'}
        justifyContent={'space-between'}
        spacing={{ md: 0, xs: 2 }}
      >
        <Grid item display={'flex'} gap={1}>
          <Box
            onClick={backArrowClick}
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <ArrowLeftIcon />
          </Box>
          <Typography variant="h3">Departments</Typography>
        </Grid>
        <Grid
          item
          display={'flex'}
          gap={2}
          alignItems={'center'}
          flexWrap={'wrap'}
        >
          <Search
            placeholder="Search Here"
            searchBy={searchBy}
            setSearchBy={setSearchBy}
          />
          <PermissionsGuard permissions={[AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.ADD_DEPARTMENTS]}>
          <Button
            startIcon={<PlusSharedColorIcon />}
            variant="contained"
            onClick={() => setOpenAddModal(true)}
            >
            Add New Department
          </Button>
            </PermissionsGuard>
        </Grid>
      </Grid>
      <DepartmentsFormModal
        methods={addFormMethod}
        handleSubmit={formSubmit}
        open={openAddModal}
        handleClose={handleClose}
        formTitle="Add Department"
        userList={userList}
        isLoading={isLoading}
      />
    </>
  );
};
