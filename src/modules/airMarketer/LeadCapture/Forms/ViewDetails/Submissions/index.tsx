import TanstackTable from '@/components/Table/TanstackTable';
import { columns, submissionsArray } from './Submissions.data';
import Search from '@/components/Search';
import { Box, Button, Divider, Grid, Tooltip } from '@mui/material';
import {
  ExportSubmissionIcon,
  FilterSubmissionsIcon,
  RefreshTasksIcon,
} from '@/assets/icons';
import useSubmissions from './useSubmissions';
import CommonDrawer from '@/components/CommonDrawer';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider } from '@/components/ReactHookForm';

const Submissions = ({ formId }: any) => {
  const {
    theme,
    setPageLimit,
    setPage,
    setSearchValue,
    dataGetFormSubmissions,
    loadingFormSubmissions,
    fetchingFormSubmissions,
    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    methodsFilter,
    handleFiltersSubmit,
    handleRefresh,
    dataCustomers,
  } = useSubmissions(formId);

  return (
    <Box
      sx={{
        border: `1px solid ${theme?.palette?.custom?.off_white_three}`,
        borderRadius: '8px',
      }}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        sx={{ padding: '15px' }}
      >
        <Box>
          <Search
            setSearchBy={setSearchValue}
            label="Search Here"
            size="small"
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Button
            variant="outlined"
            color="inherit"
            className="small"
            startIcon={<FilterSubmissionsIcon />}
            onClick={handleOpenFilters}
          >
            Filters
          </Button>
          <Tooltip title={'Refresh Filter'} placement="top-start" arrow>
            <Button
              variant="outlined"
              color="inherit"
              className="small"
              onClick={handleRefresh}
            >
              <RefreshTasksIcon />
            </Button>
          </Tooltip>
          <Button
            variant="outlined"
            color="inherit"
            className="small"
            startIcon={<ExportSubmissionIcon />}
          >
            Export
          </Button>
        </Box>
      </Box>

      <Divider sx={{ marginBottom: '15px' }} />
      <TanstackTable
        columns={columns()}
        data={dataGetFormSubmissions?.data?.leadcapturesubmissions}
        isLoading={fetchingFormSubmissions || loadingFormSubmissions}
        currentPage={dataGetFormSubmissions?.data?.meta?.page}
        count={dataGetFormSubmissions?.data?.meta?.pages}
        pageLimit={dataGetFormSubmissions?.data?.meta?.limit}
        totalRecords={dataGetFormSubmissions?.data?.meta?.total}
        setPage={setPage}
        setPageLimit={setPageLimit}
        onPageChange={(page: any) => setPage(page)}
        isPagination
      />

      <CommonDrawer
        isDrawerOpen={openFilters}
        onClose={handleCloseFilters}
        title={'Filters'}
        okText={'Apply'}
        footer={true}
        isOk={true}
        submitHandler={handleFiltersSubmit}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={methodsFilter}>
            <Grid container spacing={4}>
              {submissionsArray(dataCustomers, formId)?.map((item: any) => (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={item?.componentProps?.name}
                >
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={uuidv4()} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </Box>
  );
};

export default Submissions;
