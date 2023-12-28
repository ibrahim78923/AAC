import { Box, Button, Grid, Stack, Tooltip, Typography } from '@mui/material';

import { AddCircle } from '@mui/icons-material';

import CommonTabs from '@/components/Tabs';
import TanstackTable from '@/components/Table/TanstackTable';

import RestoreCompanies from './RestoreCompanies';
import CreateCompany from './CreateCompany';
import FilterCompany from './FilterCompany';
import CustomizeCompany from './CustomizeCompany';

import { columns, companyTabs } from './Companies.data';
import { styles } from './Companies.style';
import useCompanies from './useCompanies';

import {
  CompanyIcon,
  CustomizeIcon,
  FilterIcon,
  ImportCompaniesIcon,
  RefreshTasksIcon,
  RestoreIcon,
} from '@/assets/icons';
import CreateViewCompany from './CreateViewCompany';
import PreviewDrawer from './CompanyActions/PreviewDrawer';
import DeleteModal from './CompanyActions/DeleteModal';
import ReassignModal from './CompanyActions/ReassignModal';
import MergeModal from './CompanyActions/MergeModal';
import ImportCompanies from './ImportCompanies';

import ExportModal from './CompanyActions/ExportModal';
import ActionButton from './ActionButton';

const Companies = () => {
  const {
    theme,
    isOpenDrawer,
    setIsOpenDrawer,
    isFilter,
    setIsFilter,
    isCustomize,
    setIsCustomize,
    isToggled,
    toggle,
    isCreateView,
    setIsCreateView,
    isPreview,
    setIsPreview,
    isReassign,
    setIsReassign,
    isExport,
    setIsExport,
    isDeleteCompany,
    setIsDeleteCompany,
    isMerge,
    setIsMerge,
    isImport,
    setIsImport,
    getAllCompanies,
    setPageLimit,
    setPage,
    checkedRows,
    setCheckedRows,
    searchVal,
    setSearchVal,
    isLoading,
    isSuccess,
  } = useCompanies();

  const columnsProps = {
    checkedRows: checkedRows,
    setCheckedRows: setCheckedRows,
  };

  const columnParams = columns(columnsProps);

  return (
    <>
      {isToggled ? (
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
                  onClick={() => setIsImport(true)}
                >
                  Import
                </Button>
                <Button
                  className="small"
                  variant="contained"
                  startIcon={<AddCircle />}
                  onClick={() => {
                    setIsOpenDrawer(true);
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
              onAddClick={() => setIsCreateView(true)}
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
                    setIsPreview={setIsPreview}
                    setIsReassign={setIsReassign}
                    setIsExport={setIsExport}
                    setIsDeleteCompany={setIsDeleteCompany}
                    setIsMerge={setIsMerge}
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
                    onClick={() => setIsCustomize(true)}
                  >
                    Customize
                  </Button>
                  <Tooltip title={'Refresh Filter'}>
                    <Button
                      variant="outlined"
                      className="small"
                      color="inherit"
                    >
                      <RefreshTasksIcon />
                    </Button>
                  </Tooltip>
                  <Button
                    variant="outlined"
                    className="small"
                    color="inherit"
                    startIcon={<FilterIcon />}
                    onClick={() => setIsFilter(true)}
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

          {isOpenDrawer && (
            <CreateCompany
              isOpenDrawer={isOpenDrawer}
              setIsOpenDrawer={setIsOpenDrawer}
            />
          )}

          {isFilter && (
            <FilterCompany setIsFilter={setIsFilter} isFilter={isFilter} />
          )}

          {isCustomize && (
            <CustomizeCompany
              isCustomize={isCustomize}
              setIsCustomize={setIsCustomize}
            />
          )}

          {isCreateView && (
            <CreateViewCompany
              isCreateView={isCreateView}
              setIsCreateView={setIsCreateView}
            />
          )}

          {isPreview && (
            <PreviewDrawer isPreview={isPreview} setIsPreview={setIsPreview} />
          )}

          {isDeleteCompany && (
            <DeleteModal
              isDeleteCompany={isDeleteCompany}
              setIsDeleteCompany={setIsDeleteCompany}
            />
          )}

          {isReassign && (
            <ReassignModal
              isReassign={isReassign}
              setIsReassign={setIsReassign}
            />
          )}

          {isMerge && <MergeModal isMerge={isMerge} setIsMerge={setIsMerge} />}

          {isImport && (
            <ImportCompanies isImport={isImport} setIsImport={setIsImport} />
          )}

          {isExport && (
            <ExportModal isExport={isExport} setIsExport={setIsExport} />
          )}
        </>
      )}
    </>
  );
};

export default Companies;
