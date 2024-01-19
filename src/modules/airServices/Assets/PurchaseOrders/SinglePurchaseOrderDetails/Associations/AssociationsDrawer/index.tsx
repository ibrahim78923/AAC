import CommonDrawer from '@/components/CommonDrawer';
import { AssociationsDrawerPropsI } from './AssociationsDrawer.interface';
import Search from '@/components/Search';
import { Box, Button, Checkbox, Typography, useTheme } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { useAssociationsDrawer } from './useAssociationsDrawer';
import CustomPagination from '@/components/CustomPagination';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import NoData from '@/components/NoData';
import { NoAssociationFoundImage } from '@/assets/images';

export const AssociationsDrawer = (props: AssociationsDrawerPropsI) => {
  const theme: any = useTheme();
  const {
    lazyGetTicketsStatus,
    metaData,
    search,
    setSearch,
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
    postAssociationStatus,
  } = useAssociationsDrawer(props);
  return (
    <div>
      <CommonDrawer
        isDrawerOpen={open}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedTicketList([]);
        }}
        title="Associate Service Requests"
        isOk={true}
        footer={true}
        submitHandler={onSubmit}
        isLoading={postAssociationStatus?.isLoading}
        okText="Associate"
        isDisabled={!selectedTicketList?.length}
      >
        <>
          <Search
            label="Search"
            width="100%"
            searchBy={search}
            setSearchBy={setSearch}
            sx={{ width: '100%' }}
          />
          <Box sx={{ height: '66vh', mt: 1 }}>
            {!lazyGetTicketsStatus?.isLoading ? (
              tickets?.length ? (
                tickets?.map((item: any) => (
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    border={`.1rem solid ${theme?.palette?.grey?.[0]}`}
                    borderRadius={'.5rem'}
                    padding={'.7rem'}
                    marginBottom={'1rem'}
                    mt={'16px'}
                    key={item?._id}
                  >
                    <Box
                      display={'flex'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      gap={'1rem'}
                    >
                      <Checkbox
                        icon={<CheckboxIcon />}
                        checkedIcon={<CheckboxCheckedIcon />}
                        color="primary"
                        checked={
                          !!selectedTicketList?.find(
                            (ticket: any) => ticket?._id === item?._id,
                          )
                        }
                        onChange={(e: any) => {
                          e?.target?.checked
                            ? setSelectedTicketList([
                                ...selectedTicketList,
                                tickets?.find(
                                  (ticket: any) => ticket?._id === item?._id,
                                ),
                              ])
                            : setSelectedTicketList(
                                selectedTicketList?.filter((ticket: any) => {
                                  return ticket?._id !== item?._id;
                                }),
                              );
                        }}
                      />
                      <Typography>{item?.subject}</Typography>
                    </Box>
                    <Button
                      sx={{
                        backgroundColor: theme?.palette?.primary?.light,
                        borderRadius: '1rem',
                      }}
                    >
                      {item?.status}
                    </Button>
                  </Box>
                ))
              ) : (
                <NoData
                  image={NoAssociationFoundImage}
                  message={'No data is available'}
                  height="40vh"
                />
              )
            ) : (
              <SkeletonTable />
            )}
          </Box>
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
        </>
      </CommonDrawer>
    </div>
  );
};
