import {
  Box,
  Button,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import TanstackTable from '@/components/Table/TanstackTable';
import {
  CompanyIcon,
  CustomizeIcon,
  FilterIcon,
  ImportCompaniesIcon,
  RefreshTasksIcon,
  RestoreIcon,
} from '@/assets/icons';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateViewCompany from '../CreateViewCompany';
import PreviewDrawer from '../CompanyActions/PreviewDrawer';
import DeleteModal from '../CompanyActions/DeleteModal';
import ReassignModal from '../CompanyActions/ReassignModal';
import MergeModal from '../CompanyActions/MergeModal';
import ImportCompanies from '../ImportCompanies';
import ExportModal from '../CompanyActions/ExportModal';
import ActionButton from '../ActionButton';
import RestoreCompanies from '../RestoreCompanies';
import { styles } from '../Companies.style';
import CreateCompany from '../CreateCompany';
import FilterCompany from '../FilterCompany';
import CustomizeCompany from '../CustomizeCompany';
import useCompanyTabs from './useCompantTabs';
import { columns } from '../Companies.data';
import { v4 as uuidv4 } from 'uuid';
import Search from '@/components/Search';

const CompanyTabs = () => {
  const {
    theme,
    isOpen,
    setIsOpen,
    isToggled,
    setIstoggle,
    getAllCompanies,
    setPageLimit,
    setPage,
    checkedRows,
    setCheckedRows,
    isLoading,
    isSuccess,
    filterValues,
    setFilterValues,
    handleResetFilters,
    tabsArray,
    value,
    handleChange,
    handleTabChange,
    handleAddTab,
    handleSearch,
    handleApplyFilter,
    activeColumns,
  } = useCompanyTabs();

  const columnsProps = {
    checkedRows: checkedRows,
    setCheckedRows: setCheckedRows,
    companiesData: getAllCompanies,
    activeColumns: activeColumns,
  };

  const columnParams = columns(columnsProps);

  return (
    <>
      {isToggled ? (
        <RestoreCompanies toggle={setIstoggle} />
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
            {/* tabs section starts here  */}
            <Box
              className="tabs-container"
              sx={{
                mt: '20px',
                borderBottom: 1,
                borderColor: theme?.palette?.custom?.off_white_three,
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Tabs
                variant="scrollable"
                defaultValue={value}
                value={value}
                onChange={handleChange}
                aria-label="common tabs"
              >
                {tabsArray?.map((tab: any, index: number) => (
                  <Tab
                    sx={{
                      '&.Mui-selected': {
                        color: theme?.palette?.custom?.turquoise_Blue,
                      },
                    }}
                    classes={{ textColorPrimary: 'text-primary-my' }}
                    disableRipple
                    key={uuidv4()}
                    label={tab?.name}
                    id={`simple-tab-${index}`}
                    aria-controls={`simple-tabpanel-${index}`}
                    onClick={() => handleTabChange(tab)}
                  />
                ))}
              </Tabs>
              <Box sx={{ ml: '50px' }}>
                <AddCircleIcon
                  onClick={handleAddTab}
                  sx={{
                    float: 'right',
                    cursor: 'pointer',
                    color: theme.palette.grey[900],
                  }}
                />
              </Box>
            </Box>
            {/* tabs section ends here  */}

            {/* headers buttons starts here  */}
            <Box
              sx={{
                padding: '18px 0px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '15px',
              }}
            >
              <Search
                size="small"
                setSearchBy={handleSearch}
                placeholder="Search Here"
              />
              <Box gap={1} sx={{ display: { xs: 'flex' }, flexWrap: 'wrap' }}>
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
                  sx={{ width: { xs: '100%', sm: '113px' } }}
                  startIcon={<RestoreIcon />}
                  onClick={() => setIstoggle(true)}
                >
                  Restore
                </Button>
                <Button
                  variant="outlined"
                  className="small"
                  color="inherit"
                  sx={{ width: { xs: '100%', sm: '132px' } }}
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
                  onClick={() => {
                    setIsOpen({ ...isOpen, filtersDrawer: true });
                    handleApplyFilter;
                  }}
                >
                  Filter
                </Button>
              </Box>
            </Box>
            {/* headers buttons ends here  */}

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
      )}
    </>
  );
};

export default CompanyTabs;
