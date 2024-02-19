import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import useCatalog from './useCatalog';
import { FolderIcon } from '@/assets/icons';
import CustomPagination from '@/components/CustomPagination';

export const Catalog = () => {
  const {
    handleClick,
    result,
    handleClickService,
    data,
    handlePageChange,
    setPageLimit,
    setPage,
  } = useCatalog();

  return (
    <>
      <Typography variant="h3">All Services</Typography>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={6}
          lg={3}
          borderRadius={2}
          border={'0.2rem solid'}
          borderColor={'primary.lighter'}
          textAlign="center"
          mt={4}
          sx={{ cursor: 'pointer' }}
          onClick={() => handleClick('ALL Services')}
        >
          <Box
            alignItems={'center'}
            display={'flex'}
            justifyContent={'center'}
            mt={2}
          >
            <FolderIcon />
          </Box>
          <Typography variant="h5" mt={2}>
            All Services
          </Typography>
          <Box alignItems={'center'} display={'flex'} justifyContent={'center'}>
            <Typography
              variant="body2"
              align="center"
              gutterBottom
              mt={1}
              mb={2}
              ml={2}
              mr={2}
            >
              Browse the list of all services offered and raise a request.
            </Typography>
          </Box>
        </Grid>
        {!!data?.data?.servicecategories?.length &&
          data?.data?.servicecategories?.map((service: any) => (
            <Grid item xs={12} md={6} lg={3} key={service?._id}>
              <Box
                onClick={() => handleClick(service?._id)}
                borderRadius={2}
                border={'0.2rem solid'}
                borderColor={'primary.lighter'}
                textAlign="center"
                mt={2}
                p={2}
                sx={{ cursor: 'pointer' }}
              >
                <Box
                  alignItems={'center'}
                  display={'flex'}
                  justifyContent={'center'}
                  mt={2}
                >
                  <FolderIcon />
                </Box>
                <Typography variant="h5" mt={2}>
                  {service?.categoryName}
                </Typography>
                <Box
                  alignItems={'center'}
                  display={'flex'}
                  justifyContent={'center'}
                >
                  <Typography
                    variant="body2"
                    align="center"
                    gutterBottom
                    mt={1}
                    mb={2}
                    ml={2}
                    mr={2}
                  >
                    {service?.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
      </Grid>
      <CustomPagination
        count={data?.data?.servicecategories?.meta?.count}
        pageLimit={data?.data?.servicecategories?.meta?.pageLimit}
        rowsPerPageOptions={
          data?.data?.servicecategories?.meta?.rowsPerPageOptions
        }
        currentPage={data?.data?.servicecategories?.meta?.currentPage}
        totalRecords={data?.data?.servicecategories?.meta?.totalRecords}
        onPageChange={handlePageChange}
        setPage={setPage}
        setPageLimit={setPageLimit}
      />
      <Grid container>
        {result?.map((allService: any) => (
          <Grid item xs={12} md={6} lg={4} key={allService?._id}>
            <Box
              key={allService?._id}
              onClick={() => handleClickService?.(allService?._id)}
              borderRadius={2}
              border={'0.3rem solid'}
              borderColor={'primary.lighter'}
              display={'flex'}
              flexDirection={'row'}
              mt={4}
              mr={3}
              sx={{ cursor: 'pointer' }}
            >
              <Box
                alignItems={'center'}
                display={'flex'}
                justifyContent={'flex-start'}
                p={2}
              >
                <Image
                  src={allService?.image}
                  height={56}
                  width={58}
                  alt={`Service ${allService?.id} Image`}
                />
              </Box>
              <Box
                alignItems={'flex-start'}
                display={'flex'}
                justifyContent={'flex-start'}
                flexDirection={'column'}
                mt={2}
              >
                <Typography variant="h5">{allService?.itemName}</Typography>

                <Typography variant="body2" component={'span'}>
                  {allService?.description}
                </Typography>
                <Typography variant="body2" component={'span'}>
                  {allService?.cost}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
