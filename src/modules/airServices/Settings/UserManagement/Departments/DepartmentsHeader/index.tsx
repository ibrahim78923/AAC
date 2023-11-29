import { Box, Button, Grid, Typography } from '@mui/material';
import { ArrowLeftIcon, PlusSharedColorIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { useDepartmentsHeader } from './useDepartmentsHeader';
import { DepartmentsFormModal } from '../DepartmentsFormModal';

export const DepartmentsHeader = () => {
  const { backArrowClick, openAddModal, setOpenAddModal, formProps } =
    useDepartmentsHeader();
  const { addFormMethod, handleSubmit, submitAddForm } = formProps;
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
          <Search value="" placeholder="Search Here" />
          <Button
            startIcon={<PlusSharedColorIcon />}
            variant="contained"
            onClick={() => setOpenAddModal(true)}
          >
            Add New Department
          </Button>
        </Grid>
      </Grid>
      <DepartmentsFormModal
        methods={addFormMethod}
        handleSubmit={handleSubmit}
        submitForm={submitAddForm}
        open={openAddModal}
        handleClose={setOpenAddModal}
        formTitle="Add Department"
      />
    </>
  );
};
