import CommonDrawer from '@/components/CommonDrawer';
import Search from '@/components/Search';
import { Box } from '@mui/material';
import { useAssociationsDrawer } from './useAssociationsDrawer';
import CustomPagination from '@/components/CustomPagination';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import NoData from '@/components/NoData';
import { CustomChip } from '@/components/Chip/CustomChip';
import { CheckboxField } from '@/components/InputFields/CheckboxField';

export const AssociationsDrawer = (props: any) => {
  const {
    lazyGetTicketsStatus,
    metaData,
    search,
    handleSearch,
    pageLimit,
    setPageLimit,
    page,
    setPage,
    open,
    selectedTicketList,
    tickets,
    setDrawerOpen,
    setSelectedTicketList,
    onSubmit,
    postRemoveAssociateTicketsStatus,
    handleChange,
  } = useAssociationsDrawer(props);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={open}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedTicketList([]);
        }}
        title="Associate Service Requests"
        isOk
        footer
        submitHandler={onSubmit}
        isLoading={postRemoveAssociateTicketsStatus?.isLoading}
        okText="Associate"
        isDisabled={!selectedTicketList?.length}
        disabledCancelBtn={postRemoveAssociateTicketsStatus?.isLoading}
      >
        <Box my={1}>
          <Search
            label="Search"
            width="100%"
            searchBy={search}
            setSearchBy={handleSearch}
          />
        </Box>
        {!lazyGetTicketsStatus?.isLoading ? (
          tickets?.length ? (
            tickets?.map((item: any) => (
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                border={`1px solid `}
                borderColor="grey.0"
                borderRadius={2}
                padding={1}
                mt={2}
                key={item?._id}
              >
                <CheckboxField
                  label={item?.subject}
                  checked={
                    !!selectedTicketList?.find(
                      (ticket: any) => ticket?._id === item?._id,
                    )
                  }
                  onChange={(e: any) => handleChange?.(e, item)}
                />

                <CustomChip
                  label={item?.status?.toLowerCase()}
                  backgroundColor="primary.light"
                  textColor="primary.main"
                  isCapital
                  size="medium"
                  customStyles={{
                    fontWeight: 700,
                  }}
                />
              </Box>
            ))
          ) : (
            <NoData message={'No data is available'} height="40vh" />
          )
        ) : (
          <SkeletonTable />
        )}
        {metaData && (
          <Box>
            <CustomPagination
              currentPage={page}
              count={metaData?.pages}
              pageLimit={pageLimit}
              totalRecords={metaData?.total}
              onPageChange={(page: any) => setPage(page)}
              setPage={setPage}
              setPageLimit={setPageLimit}
            />
          </Box>
        )}
      </CommonDrawer>
    </>
  );
};
