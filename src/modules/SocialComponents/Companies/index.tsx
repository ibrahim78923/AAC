// import { Box, Button, Grid, Stack, Tooltip, Typography } from '@mui/material';

// import { AddCircle } from '@mui/icons-material';

// import CommonTabs from '@/components/Tabs';
// import TanstackTable from '@/components/Table/TanstackTable';

// import RestoreCompanies from './RestoreCompanies';
// import CreateCompany from './CreateCompany';
// import FilterCompany from './FilterCompany';
// import CustomizeCompany from './CustomizeCompany';

// import { columns, companyTabs } from './Companies.data';
// import { styles } from './Companies.style';
// import useCompanies from './useCompanies';

// import {
//   CompanyIcon,
//   CustomizeIcon,
//   FilterIcon,
//   ImportCompaniesIcon,
//   RefreshTasksIcon,
//   RestoreIcon,
// } from '@/assets/icons';
// import CreateViewCompany from './CreateViewCompany';
// import PreviewDrawer from './CompanyActions/PreviewDrawer';
// import DeleteModal from './CompanyActions/DeleteModal';
// import ReassignModal from './CompanyActions/ReassignModal';
// import MergeModal from './CompanyActions/MergeModal';
// import ImportCompanies from './ImportCompanies';

// import ExportModal from './CompanyActions/ExportModal';
// import ActionButton from './ActionButton';
import CompanyTabs from './CompanyTabs';

const Companies = () => {
  // const {
  //   theme,
  //   isOpen,
  //   setIsOpen,
  //   isToggled,
  //   toggle,
  //   getAllCompanies,
  //   setPageLimit,
  //   setPage,
  //   checkedRows,
  //   setCheckedRows,
  //   searchVal,
  //   setSearchVal,
  //   isLoading,
  //   isSuccess,
  //   filterValues,
  //   setFilterValues,
  //   handleResetFilters,
  // } = useCompanies();

  // const columnsProps = {
  //   checkedRows: checkedRows,
  //   setCheckedRows: setCheckedRows,
  //   companiesData: getAllCompanies,
  // };

  // const columnParams = columns(columnsProps);

  return (
    <>
      <CompanyTabs />
      {/* {isToggled ? (
        <RestoreCompanies toggle={toggle} />
      ) : (
        <>
          <Box sx={styles?.mainCompanyBox(theme)}>
            <Stack
              direction={{ md: 'row', xs: 'column' }}
              justifyContent="space-between"
              gap={1}
            >
              <Typography
                variant="h3"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: `${theme?.palette?.grey[800]}`,
                }}
              >
                <CompanyIcon /> Companies
              </Typography>
              <Box
                display="flex"
                gap={1}
                flexDirection={{ sm: 'row', xs: 'column' }}
              >
                <Button
                  className="small"
                  color="inherit"
                  variant="outlined"
                  startIcon={<ImportCompaniesIcon />}
                  onClick={() => setIsOpen({ ...isOpen, importDrawer: true })}
                >
                  Import
                </Button>
                <Button
                  className="small"
                  variant="contained"
                  startIcon={<AddCircle />}
                  onClick={() => {
                    setIsOpen({ ...isOpen, createCompanyDrawer: true });
                  }}
                >
                  Create Company
                </Button>
              </Box>
            </Stack>

            <CommonTabs
              tabsArray={companyTabs}
              isHeader={true}
              addIcon
              onAddClick={() =>
                setIsOpen({ ...isOpen, createViewDrawer: true })
              }
              searchBarProps={{
                label: 'Search Here',
                setSearchBy: setSearchVal,
                searchBy: searchVal,
                width: '260px',
              }}
              headerChildren={
                <>
                  <ActionButton
                    checkedRows={checkedRows}
                    setCheckedRows={setCheckedRows}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                  />
                  <Button
                    variant="outlined"
                    className="small"
                    color="inherit"
                    startIcon={<RestoreIcon />}
                    onClick={() => toggle(true)}
                  >
                    Restore
                  </Button>
                  <Button
                    variant="outlined"
                    className="small"
                    color="inherit"
                    startIcon={<CustomizeIcon />}
                    onClick={() =>
                      setIsOpen({ ...isOpen, customizeDrawer: true })
                    }
                  >
                    Customize
                  </Button>
                  <Tooltip title={'Refresh Filter'}>
                    <Button
                      variant="outlined"
                      className="small"
                      color="inherit"
                      onClick={handleResetFilters}
                    >
                      <RefreshTasksIcon />
                    </Button>
                  </Tooltip>
                  <Button
                    variant="outlined"
                    className="small"
                    color="inherit"
                    startIcon={<FilterIcon />}
                    onClick={() =>
                      setIsOpen({ ...isOpen, filtersDrawer: true })
                    }
                  >
                    Filter
                  </Button>
                </>
              }
            >
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TanstackTable
                  columns={columnParams}
                  data={getAllCompanies?.data?.companies}
                  totalRecords={getAllCompanies?.data?.meta?.total}
                  pageLimit={getAllCompanies?.data?.meta?.limit}
                  onPageChange={(page: any) => setPage(page)}
                  setPage={setPage}
                  setPageLimit={setPageLimit}
                  count={getAllCompanies?.data?.meta?.pages}
                  isPagination
                  isLoading={isLoading}
                  isSuccess={isSuccess}
                />
              </Grid>
            </CommonTabs>
          </Box>

          {isOpen?.createCompanyDrawer && (
            <CreateCompany
              isOpenDrawer={isOpen?.createCompanyDrawer}
              setIsOpenDrawer={setIsOpen}
            />
          )}

          {isOpen?.filtersDrawer && (
            <FilterCompany
              filterValues={filterValues}
              setFilterValues={setFilterValues}
              setIsFilter={setIsOpen}
              isFilter={isOpen?.filtersDrawer}
            />
          )}

          {isOpen?.customizeDrawer && (
            <CustomizeCompany
              isCustomize={isOpen?.customizeDrawer}
              setIsCustomize={setIsOpen}
            />
          )}

          {isOpen?.createViewDrawer && (
            <CreateViewCompany
              isCreateView={isOpen?.createViewDrawer}
              setIsCreateView={setIsOpen}
            />
          )}

          {isOpen?.previewDrawer && (
            <PreviewDrawer
              checkedRows={checkedRows}
              isPreview={isOpen?.previewDrawer}
              setIsPreview={setIsOpen}
            />
          )}

          {isOpen?.deleteModal && (
            <DeleteModal
              setCheckedRows={setCheckedRows}
              checkedRows={checkedRows}
              isDeleteCompany={isOpen?.deleteModal}
              setIsDeleteCompany={setIsOpen}
            />
          )}

          {isOpen?.reassignModal && (
            <ReassignModal
              isReassign={isOpen?.reassignModal}
              setIsReassign={setIsOpen}
              setCheckedRows={setCheckedRows}
              checkedRows={checkedRows}
            />
          )}

          {isOpen?.mergeModal && (
            <MergeModal
              isMerge={isOpen?.mergeModal}
              setIsMerge={setIsOpen}
              checkedRows={checkedRows}
              setCheckedRows={setCheckedRows}
            />
          )}

          {isOpen?.importDrawer && (
            <ImportCompanies
              isImport={isOpen?.importDrawer}
              setIsImport={setIsOpen}
            />
          )}

          {isOpen?.exportModal && (
            <ExportModal
              isExport={isOpen?.exportModal}
              setIsExport={setIsOpen}
            />
          )}
        </>
      )} */}
    </>
  );
};

export default Companies;
