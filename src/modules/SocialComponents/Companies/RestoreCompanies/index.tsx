import { Box, Button, Grid, Tooltip, Typography } from '@mui/material';

import { BackArrowIcon, RefreshTasksIcon } from '@/assets/icons';
import TanstackTable from '@/components/Table/TanstackTable';
import useRestoreCompanies from './useRestoreCompanies';
import Search from '@/components/Search';
import { columns } from './RestoreCompanies.data';
import { styles } from './RestoreComponies.style';
import DeleteModal from './ActionsModals/DeleteModal';
import RestoreModal from './ActionsModals/RestoreModal';
import ActionButton from './ActionButton';
import SwitchableDatepicker from '@/components/SwitchableDatepicker';

const RestoreCompanies = (props: any) => {
  const { toggle } = props;

  const {
    theme,
    isDeleteModal,
    setIsDeleteModal,
    isRestoreModal,
    setIsRestoreModal,
    checkedRows,
    setCheckedRows,
    datePickerVal,
    setDatePickerVal,
    setPage,
    setPageLimit,
    filterValues,
    setFilterValues,
    getAllDeletedCompanies,
    isLoading,
    isSuccess,
    resetFilters,
  } = useRestoreCompanies();

  const columnsProps = {
    checkedRows: checkedRows,
    setCheckedRows: setCheckedRows,
    companiesData: getAllDeletedCompanies,
  };

  const columnParams = columns(columnsProps);

  return (
    <>
      <Box sx={styles?.mainCompanyBox}>
        <Grid container>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Box sx={{ cursor: 'pointer' }} onClick={() => toggle(true)}>
                <BackArrowIcon />
              </Box>
              <Box sx={{ marginTop: '1rem' }}>
                <Typography
                  variant="h3"
                  sx={{ color: `${theme?.palette?.grey[800]}` }}
                >
                  Restore Companies
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: `${theme?.palette?.custom?.main}` }}
                >
                  Restore Company deleted in the last 90 days
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          sx={{ paddingTop: '2rem', paddingBottom: '1rem' }}
        >
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Search
              label="Search by Name"
              width="260px"
              size="small"
              searchBy={filterValues?.search}
              onChange={(e: any) => {
                setFilterValues({ ...filterValues, search: e?.target?.value });
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              <ActionButton
                checkedRows={checkedRows}
                setRestoreModal={setIsRestoreModal}
                setDeleteModal={setIsDeleteModal}
              />

              <SwitchableDatepicker
                renderInput="button"
                placement="right"
                dateValue={datePickerVal}
                setDateValue={setDatePickerVal}
                handleDateSubmit={() => {
                  setFilterValues({ ...filterValues, date: datePickerVal });
                }}
              />

              <Tooltip title={'Reset Date'}>
                <Button
                  variant="outlined"
                  color="inherit"
                  className="small"
                  onClick={resetFilters}
                >
                  <RefreshTasksIcon />
                </Button>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>

        <TanstackTable
          columns={columnParams}
          data={getAllDeletedCompanies?.data?.companies}
          totalRecords={getAllDeletedCompanies?.data?.meta?.total}
          pageLimit={getAllDeletedCompanies?.data?.meta?.limit}
          onPageChange={(page: any) => setPage(page)}
          setPage={setPage}
          setPageLimit={setPageLimit}
          count={getAllDeletedCompanies?.data?.meta?.pages}
          isPagination
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      </Box>

      {isDeleteModal?.isOpen && (
        <DeleteModal
          setCheckedRows={setCheckedRows}
          checkedRows={checkedRows}
          isRestoreDelete={isDeleteModal}
          setIsRestoreDelete={setIsDeleteModal}
        />
      )}
      {isRestoreModal?.isOpen && (
        <RestoreModal
          setCheckedRows={setCheckedRows}
          checkedRows={checkedRows}
          isRestoreItem={isRestoreModal}
          setIsRestoreItem={setIsRestoreModal}
        />
      )}
    </>
  );
};

export default RestoreCompanies;
