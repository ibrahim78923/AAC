import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import Search from '@/components/Search';
import { AIR_SERVICES_ENQUIRIES_PERMISSION } from '@/constants/permission-keys';
import { FilterIcon } from '@/assets/icons';
import { Button, Grid } from '@mui/material';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import TanstackTable from '@/components/Table/TanstackTable';
import Filters from './Filters';
import useEnquiries from './useEnquiries';
import ViewEnquiry from './ViewEnquiry';
import { DeleteEnquiry } from './DeleteEnquiry';
import ConvertTicket from './ConvertTicket';
import CreateRequester from './CreateRequester';

export default function Enquiries() {
  const {
    setSearchBy,
    isModalOpen,
    setIsModalOpen,
    data,
    enquiriesColumns,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    setPageLimit,
    setPage,
    setFilter,
    enquiriesActionDropdown,
    enquiriesSelected,
    setEnquiriesSelected,
  } = useEnquiries();

  return (
    <>
      <PageTitledHeader title={'Enquiries'} />
      <Grid container justifyContent={'space-between'} spacing={4}>
        <Grid item xs={12} md={6}>
          <PermissionsGuard
            permissions={[AIR_SERVICES_ENQUIRIES_PERMISSION?.SEARCH_AND_FILTER]}
          >
            <Search label="Search Here" setSearchBy={setSearchBy} />
          </PermissionsGuard>
        </Grid>

        <Grid item xs={12} md={6} textAlign={'end'}>
          <SingleDropdownButton
            dropdownOptions={enquiriesActionDropdown}
            disabled={!!!enquiriesSelected?.length}
          />

          <PermissionsGuard
            permissions={[AIR_SERVICES_ENQUIRIES_PERMISSION?.SEARCH_AND_FILTER]}
          >
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              color="secondary"
              sx={{ ml: 2 }}
              onClick={() => {
                setIsModalOpen({
                  filterOpen: true,
                  viewOpen: false,
                  deleteOpen: false,
                  convertToTicket: false,
                  createRequester: false,
                  data: null,
                });
              }}
            >
              Filter
            </Button>
          </PermissionsGuard>
        </Grid>

        <Grid item xs={12}>
          <PermissionsGuard
            permissions={[AIR_SERVICES_ENQUIRIES_PERMISSION?.ENQUIRIES_LIST]}
          >
            <TanstackTable
              data={data?.data?.enquiries}
              columns={enquiriesColumns}
              isPagination
              isLoading={isLoading}
              isError={isError}
              isFetching={isFetching}
              isSuccess={isSuccess}
              setPageLimit={setPageLimit}
              setPage={setPage}
              currentPage={data?.data?.meta?.page}
              count={data?.data?.meta?.pages}
              pageLimit={data?.data?.meta?.limit}
              totalRecords={data?.data?.meta?.total}
              onPageChange={(page: any) => setPage(page)}
            />
          </PermissionsGuard>
        </Grid>
      </Grid>

      {isModalOpen?.filterOpen && (
        <Filters
          isModalOpen={isModalOpen?.filterOpen}
          onClose={() => {
            setIsModalOpen({
              filterOpen: false,
              viewOpen: false,
              deleteOpen: false,
              convertToTicket: false,
              createRequester: false,
              data: null,
            });
            setEnquiriesSelected([]);
          }}
          setFilter={setFilter}
        />
      )}

      {isModalOpen?.viewOpen && (
        <ViewEnquiry
          isModalOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen({
              filterOpen: false,
              viewOpen: false,
              deleteOpen: false,
              convertToTicket: false,
              createRequester: false,
              data: null,
            });
            setEnquiriesSelected([]);
          }}
        />
      )}

      {isModalOpen?.deleteOpen && (
        <DeleteEnquiry
          isModalOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen({
              filterOpen: false,
              viewOpen: false,
              deleteOpen: false,
              convertToTicket: false,
              createRequester: false,
              data: null,
            });
            setEnquiriesSelected([]);
          }}
        />
      )}

      {isModalOpen?.convertToTicket && (
        <ConvertTicket
          isModalOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen({
              filterOpen: false,
              viewOpen: false,
              deleteOpen: false,
              convertToTicket: false,
              createRequester: false,
              data: null,
            });
            setEnquiriesSelected([]);
          }}
        />
      )}

      {isModalOpen?.createRequester && (
        <CreateRequester
          isModalOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen({
              filterOpen: false,
              viewOpen: false,
              deleteOpen: false,
              convertToTicket: false,
              createRequester: false,
              data: null,
            });
            setEnquiriesSelected([]);
          }}
        />
      )}
    </>
  );
}
