import { Box, Button, Grid, Tooltip } from '@mui/material';
import { FilterrIcon, RefreshTasksIcon } from '@/assets/icons';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './DelegateFilter.data';
import useDelegateFilterTable from './useDelegateFilterTable';
import { styles } from './DelegateFilterTable.style';
import DelegateFilter from '../DelegateFilter';
import DelegateViewModal from '../DelegateViewModal';

const DelegateFilterTable = ({ data }: any) => {
  const {
    setPage,
    setPageLimit,
    getDelegateData,
    setSearchValue,
    setIsModalOpen,
    setFilterValue,
    isModalOpen,
    isFetching,
    getDelgateDataLoading,
    handleResetFilterValue,
    filterValue,
  } = data;

  handleResetFilterValue;
  const tableData = getDelegateData?.data?.delegatedUsers;
  const paginationData = getDelegateData?.data?.meta;

  const { isFilterDrawer, setIsFilterDrawer, theme } = useDelegateFilterTable();

  return (
    <>
      <Box sx={{ marginTop: '1rem' }}>
        <Box>
          <Grid container spacing={2}>
            <Grid item lg={3} md={3} sm={6} xs={12}>
              <Search
                size="small"
                label="Search here"
                setSearchBy={setSearchValue}
              />
            </Grid>
            <Grid
              item
              container
              justifyContent="end"
              gap={2}
              lg={9}
              md={9}
              sm={6}
              xs={12}
            >
              <Tooltip title={'Refresh Filter'}>
                <Button
                  variant="outlined"
                  color="inherit"
                  className="small"
                  onClick={handleResetFilterValue}
                >
                  <RefreshTasksIcon />
                </Button>
              </Tooltip>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  onClick={() => {
                    setIsFilterDrawer(true);
                  }}
                  variant="outlined"
                  sx={styles?.fiterButton(theme)}
                  className="small"
                  startIcon={<FilterrIcon />}
                >
                  Filter
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Grid sx={{ marginTop: '1rem' }}>
          <TanstackTable
            columns={columns(setIsModalOpen, isModalOpen)}
            data={tableData}
            isPagination
            onPageChange={(page: any) => setPage(page)}
            setPage={setPage}
            setPageLimit={setPageLimit}
            count={paginationData?.pages}
            pageLimit={paginationData?.limit}
            totalRecords={paginationData?.total}
            currentPage={paginationData?.page}
            isLoading={getDelgateDataLoading || isFetching}
          />
        </Grid>
      </Box>

      {isFilterDrawer && (
        <DelegateFilter
          isFilterDrawer={isFilterDrawer}
          setIsFilterDrawer={setIsFilterDrawer}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
      )}
      {isModalOpen?.viewDetail && (
        <DelegateViewModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

export default DelegateFilterTable;
