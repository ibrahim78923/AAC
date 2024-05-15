import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
import Image from 'next/image';
import { CirclePlusIcon } from '@/assets/icons';
import { AddServiceCatalog } from './AddServiceCatalog';
import useServices from './useServices';
import { ServicesAction } from './ServicesAction';
import { CatalogAddImage, NoAssociationFoundImage } from '@/assets/images';
import NoData from '@/components/NoData';
import CustomPagination from '@/components/CustomPagination';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { generateImage } from '@/utils/avatarUtils';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';

const Services = () => {
  const router = useRouter();
  const theme = useTheme();
  const {
    results,
    selectedCheckboxes,
    setSelectedCheckboxes,
    isAnyCheckboxSelected,
    open,
    setOpen,
    handleClickOpen,
    categories,
    setPageLimit,
    setPage,
    handlePageChange,
    paginationData,
    categoriesIsLoading,
    categoriesIsFetching,
    isLoading,
    isFetching,
  } = useServices();

  return (
    <PermissionsGuard
      permissions={[
        AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.VIEW_SERVICES_CATALOG,
      ]}
    >
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={2}
        mb={4}
      >
        <Box
          display={'flex'}
          alignItems={'center'}
          flexWrap={'wrap'}
          gap={1}
          sx={{ cursor: 'pointer' }}
        >
          <ArrowBackIcon
            onClick={() => {
              const isMatch = categories?.some(
                (service: any) =>
                  service?.categoryName === router?.query?.categoryName,
              );

              if (isMatch) {
                router.push(AIR_SERVICES?.SERVICE_CATALOG);
              } else {
                router.push(AIR_SERVICES?.SERVICE_MANAGEMENT);
              }
            }}
          />

          <Typography variant="h3">Service Catalog</Typography>
          {router?.query?.categoryName && (
            <>
              <ArrowForwardIosIcon fontSize="small" />
              <Typography variant="h3">
                {router?.query?.categoryName}
              </Typography>
            </>
          )}
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'}>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.ADD_NEW_SERVICE,
            ]}
          >
            <Button
              variant="contained"
              startIcon={<CirclePlusIcon />}
              onClick={() => router.push(AIR_SERVICES?.UPSERT_SERVICE)}
            >
              Add Service
            </Button>
          </PermissionsGuard>
        </Box>
      </Box>
      <Divider />

      {categoriesIsLoading || categoriesIsFetching ? (
        <SkeletonForm />
      ) : (
        <>
          <Grid container spacing={2} mb={4} mt={2}>
            <Grid item xs={12} md={6} lg={3}>
              <Box
                maxHeight={'300px'}
                minHeight={'300px'}
                borderRadius={2}
                border={`1px solid ${theme?.palette?.primary?.main}`}
                alignItems={'center'}
                display={'flex'}
                justifyContent={'center'}
                sx={{ cursor: 'pointer' }}
                onClick={handleClickOpen}
              >
                <PermissionsGuard
                  permissions={[
                    AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.ADD_SERVICES_CATEGORY,
                  ]}
                >
                  <Box
                    alignItems={'center'}
                    display={'flex'}
                    justifyContent={'center'}
                    flexDirection={'row'}
                    onClick={handleClickOpen}
                  >
                    <Image
                      src={CatalogAddImage}
                      height={64}
                      width={64}
                      alt={'catalogAdd'}
                    />
                  </Box>
                </PermissionsGuard>
              </Box>
              <AddServiceCatalog open={open} setOpen={setOpen} />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <Box
                maxHeight={'300px'}
                minHeight={'300px'}
                onClick={() => {
                  router.push({
                    pathname: AIR_SERVICES?.SERVICE_CATALOG_SETTINGS,
                  });
                }}
                borderRadius={2}
                textAlign="center"
                sx={{ cursor: 'pointer' }}
                bgcolor={
                  !router?.query?.categoryId
                    ? `${theme?.palette?.primary?.light}`
                    : ''
                }
                border={
                  !router?.query?.categoryId
                    ? `1px solid ${theme?.palette?.primary?.main}`
                    : `1px solid ${theme?.palette?.primary?.light}`
                }
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                p={1}
              >
                <FolderIcon color="primary" fontSize="large" />
                <Typography variant="h5" mt={1}>
                  All Services
                </Typography>
              </Box>
            </Grid>

            {categories?.map((service: any) => (
              <Grid item xs={12} md={6} lg={3} key={service?._id}>
                <Box
                  maxHeight={'300px'}
                  minHeight={'300px'}
                  overflow={'auto'}
                  onClick={() => {
                    router.push({
                      pathname: AIR_SERVICES?.SERVICE_CATALOG_SETTINGS,
                      query: {
                        categoryId: service?._id,
                        categoryName: service?.categoryName,
                      },
                    });
                  }}
                  borderRadius={2}
                  textAlign="center"
                  sx={{ cursor: 'pointer' }}
                  bgcolor={
                    router?.query?.categoryId === service?._id
                      ? `${theme?.palette?.primary?.light}`
                      : ''
                  }
                  border={
                    router?.query?.categoryId === service?._id
                      ? `1px solid ${theme?.palette?.primary?.main}`
                      : `1px solid ${theme?.palette?.primary?.light}`
                  }
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  p={1}
                >
                  <FolderIcon color="primary" fontSize="large" />
                  <Typography variant="h5">{service?.categoryName}</Typography>
                  <Typography variant="body2">
                    {service?.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <CustomPagination
            count={paginationData?.pages}
            pageLimit={paginationData?.limit}
            currentPage={paginationData?.page}
            totalRecords={paginationData?.total}
            onPageChange={handlePageChange}
            setPage={setPage}
            setPageLimit={setPageLimit}
          />
        </>
      )}

      <PermissionsGuard
        permissions={[
          AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.VIEW_DETAILS_OF_CATALOG_SERVICE,
        ]}
      >
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          flexWrap={'wrap'}
          gap={2}
        >
          <Box
            display={'flex'}
            alignItems={'center'}
            flexWrap={'wrap'}
            bgcolor={'grey.400'}
            borderRadius={2}
            width={300}
            justifyContent={'space-between'}
            gap={2}
            mt={6}
          >
            <Box display={'flex'} alignItems={'center'} gap={1}>
              <Checkbox
                checked={
                  selectedCheckboxes?.length !== 0 &&
                  results?.length === selectedCheckboxes?.length
                }
                onChange={(e: any) => {
                  e?.target?.checked
                    ? setSelectedCheckboxes(
                        results?.map((result: any) => result?._id),
                      )
                    : setSelectedCheckboxes([]);
                }}
                color="primary"
                name="_id"
              />

              <Typography variant="h6"> Select All</Typography>
            </Box>
          </Box>
          <Box mt={6}>
            {selectedCheckboxes && (
              <ServicesAction
                selectedCheckboxes={selectedCheckboxes}
                setSelectedCheckboxes={setSelectedCheckboxes}
                isDisabled={!isAnyCheckboxSelected()}
              />
            )}
          </Box>
        </Box>
        {isLoading || isFetching ? (
          <SkeletonForm />
        ) : (
          <Grid container spacing={2} mt={2} mb={8}>
            {!!results?.length ? (
              results?.map((result: any) => (
                <Grid item xs={12} md={6} lg={4} key={result?._id}>
                  <Box
                    maxHeight={'300px'}
                    minHeight={'300px'}
                    overflow={'scroll'}
                    borderRadius={2}
                    border={'0.2rem solid'}
                    borderColor={'primary.lighter'}
                    textAlign="center"
                    mt={2}
                    sx={{ cursor: 'pointer' }}
                  >
                    <Box
                      alignItems={'center'}
                      display={'flex'}
                      flexWrap={'wrap'}
                      mt={2}
                    >
                      <Box display={'flex'} alignItems={'center'} mr={2}>
                        <Checkbox
                          checked={
                            !!selectedCheckboxes?.find(
                              (item: any) => item === result?._id,
                            )
                          }
                          onChange={(e: any) => {
                            e?.target?.checked
                              ? setSelectedCheckboxes([
                                  ...selectedCheckboxes,
                                  result?._id,
                                ])
                              : setSelectedCheckboxes(
                                  selectedCheckboxes?.filter(
                                    (item: any) => item !== result?._id,
                                  ),
                                );
                          }}
                        />
                      </Box>
                      <Avatar
                        sx={{ height: '4rem', width: '4rem' }}
                        src={generateImage(result?.attachmentDetails?.fileUrl)}
                      />
                    </Box>
                    <Box alignItems={'center'} display={'flex'}>
                      <Typography
                        variant="h5"
                        align="center"
                        gutterBottom
                        ml={4}
                        mr={1}
                        mt={2}
                      >
                        {result?.itemName ?? '-'}
                      </Typography>
                    </Box>
                    <Box alignItems={'center'} display={'flex'}>
                      <Typography variant="body2" align="left" gutterBottom>
                        Cost:
                        {result?.cost ?? '-'}
                      </Typography>
                    </Box>
                    <Box alignItems={'center'} display={'flex'}>
                      <Typography
                        variant="body2"
                        align="center"
                        gutterBottom
                        mr={1}
                        ml={4}
                      >
                        Estimated Delivery:
                        {result?.estimatedDelivery ?? '-'}
                      </Typography>
                    </Box>
                    <Box
                      alignItems={'center'}
                      display={'flex'}
                      sx={{ wordBreak: 'break-all' }}
                    >
                      <Typography
                        variant="body3"
                        align="center"
                        gutterBottom
                        mr={1}
                        ml={4}
                      >
                        Description:
                        {result?.description ?? '-'}
                      </Typography>
                    </Box>
                    <Box alignItems={'center'} display={'flex'}>
                      {result?.status && (
                        <Typography
                          variant="body3"
                          align="center"
                          gutterBottom
                          mr={1}
                          ml={4}
                        >
                          Status:
                          {result?.status}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Grid>
              ))
            ) : (
              <NoData
                image={NoAssociationFoundImage}
                message={'No Data Found'}
              />
            )}
          </Grid>
        )}
      </PermissionsGuard>
    </PermissionsGuard>
  );
};

export default Services;
