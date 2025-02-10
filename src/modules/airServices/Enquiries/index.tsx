import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import Search from '@/components/Search';
import { AIR_SERVICES_ENQUIRIES_PERMISSION } from '@/constants/permission-keys';
import { Box } from '@mui/material';
import { SingleDropdownButton } from '@/components/Buttons/SingleDropdownButton';
import TanstackTable from '@/components/Table/TanstackTable';
import Filters from './Filters';
import useEnquiries from './useEnquiries';
import ViewEnquiry from './ViewEnquiry';
import { DeleteEnquiry } from './DeleteEnquiry';
import ConvertTicket from './ConvertTicket';
import { Permissions } from '@/constants/permissions';
import { CustomButton } from '@/components/Buttons/CustomButton';

const Enquiries = () => {
  const {
    isModalOpen,
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
    closeModal,
    openFilterModal,
    handleSearch,
  } = useEnquiries();

  return (
    <>
      <PageTitledHeader title={'Enquiries'} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 3,
          my: 2,
        }}
      >
        <Box>
          <PermissionsGuard
            permissions={[AIR_SERVICES_ENQUIRIES_PERMISSION?.SEARCH_AND_FILTER]}
          >
            <Search label="Search Here" setSearchBy={handleSearch} />
          </PermissionsGuard>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <PermissionsGuard
            permissions={Permissions?.AIR_SERVICES_ENQUIRIES_ACTIONS}
          >
            <SingleDropdownButton
              dropdownOptions={enquiriesActionDropdown}
              disabled={!!!enquiriesSelected?.length}
            />
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_SERVICES_ENQUIRIES_PERMISSION?.SEARCH_AND_FILTER]}
          >
            <CustomButton onClick={openFilterModal}>Filter</CustomButton>
          </PermissionsGuard>
        </Box>
      </Box>

      <Box>
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
            onPageChange={(page: number) => setPage(page)}
          />
        </PermissionsGuard>
      </Box>

      {isModalOpen?.filterOpen && (
        <Filters
          isModalOpen={isModalOpen}
          onClose={closeModal}
          setFilter={setFilter}
        />
      )}

      {isModalOpen?.viewOpen && (
        <ViewEnquiry isModalOpen={isModalOpen} onClose={closeModal} />
      )}

      {isModalOpen?.deleteOpen && (
        <DeleteEnquiry isModalOpen={isModalOpen} onClose={closeModal} />
      )}

      {isModalOpen?.convertToTicket && (
        <ConvertTicket isModalOpen={isModalOpen} onClose={closeModal} />
      )}
    </>
  );
};
export default Enquiries;
