import { Box, Grid, Skeleton, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { FolderLargePrimaryIcon, FolderLargeYellowIcon } from '@/assets/icons';
import { CreateNewFolder } from './CreateNewFolder';
import Search from '@/components/Search';
import Link from 'next/link';
import { AIR_SERVICES } from '@/constants';
import { useCannedResponses } from './useCannedResponses';
import { FolderMenu } from './FolderMenu';
import CustomPagination from '@/components/CustomPagination';

export const CannedResponses = () => {
  const {
    router,
    convertToHyphenCase,
    setOpenCreateNewFolderModal,
    openCreateNewFolderModal,
    search,
    setSearch,
    cannedResponses,
    lazyGetCannedResponsesStatus,
    setPageLimit,
    setPage,
    pageLimit,
    page,
    cannedResponsesMetaData,
  } = useCannedResponses();
  return (
    <>
      <Box mb={2}>
        <PageTitledHeader
          title="Canned Responses"
          canMovedBack
          moveBack={() =>
            router?.push(AIR_SERVICES?.AGENT_PERFORMANCE_MANAGEMENT_SETTINGS)
          }
        />
      </Box>
      <Box mb={2}>
        <Search
          size="small"
          label="Search"
          searchBy={search}
          setSearchBy={setSearch}
        />
      </Box>
      <Grid container spacing={3}>
        <Grid item lg={4} sm={6} xs={12}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            gap=".7rem"
            height="12rem"
            border="0.06rem solid"
            borderColor="grey.700"
            borderRadius=".5rem"
            sx={{ cursor: 'pointer' }}
            onClick={() =>
              setOpenCreateNewFolderModal({ open: true, editData: null })
            }
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="2.1rem"
              height="2.1rem"
              bgcolor="custom.light_lavender_gray"
              borderRadius="50%"
            >
              <AddRoundedIcon
                sx={{
                  color: 'blue.dull_blue',
                }}
              />
            </Box>
            <Typography fontWeight={600} color="blue.dull_blue">
              Add New
            </Typography>
          </Box>
        </Grid>
        {cannedResponses?.map((response: any) => (
          <Grid item lg={4} sm={6} xs={12} key={response?._id}>
            <Box
              height="12rem"
              border="0.06rem solid"
              overflow="hidden"
              borderColor="grey.700"
              borderRadius=".5rem"
              sx={{ cursor: 'pointer' }}
            >
              <FolderMenu
                response={response}
                setOpenCreateNewFolderModal={setOpenCreateNewFolderModal}
              />
              <Box
                display="flex"
                justifyContent="center"
                p={{ sm: 2, xs: 1 }}
                flexDirection="column"
                component={Link}
                href={`${AIR_SERVICES?.CANNED_RESPONSE_SETTINGS}/${convertToHyphenCase(
                  response?.folderName,
                )}`}
              >
                <Box>
                  {!response?.isDeletedAble ? (
                    <FolderLargePrimaryIcon />
                  ) : (
                    <FolderLargeYellowIcon />
                  )}
                </Box>
                <Typography fontWeight={700} color="blue.dark" mt={1}>
                  {response?.folderName}
                </Typography>
                <Typography
                  fontWeight={500}
                  variant="body2"
                  color="custom.main"
                  sx={{
                    textOverflow: 'break-all',
                    wordBreak: 'break-all',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {response?.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
        {lazyGetCannedResponsesStatus?.isLoading &&
          Array?.from({ length: 5 })?.map((response: any) => (
            <Grid item lg={4} sm={6} xs={12} key={response?._id}>
              <Skeleton height="12rem" variant="rectangular" />
            </Grid>
          ))}
        {cannedResponsesMetaData && cannedResponsesMetaData?.total > 5 && (
          <Grid item xs={12}>
            <CustomPagination
              currentPage={page}
              count={cannedResponsesMetaData?.pages}
              pageLimit={pageLimit}
              totalRecords={cannedResponsesMetaData?.total}
              onPageChange={(page: any) => setPage(page)}
              setPage={setPage}
              setPageLimit={setPageLimit}
            />
          </Grid>
        )}
      </Grid>
      <CreateNewFolder
        openCreateNewFolderModal={openCreateNewFolderModal}
        closeCreateNewFolderModal={() =>
          setOpenCreateNewFolderModal({ open: false, editData: null })
        }
      />
    </>
  );
};
