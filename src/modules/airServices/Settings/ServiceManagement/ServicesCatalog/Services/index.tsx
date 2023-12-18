import {
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';

import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
import { services } from './Services.data';
import Image from 'next/image';

import AddIcon from '@mui/icons-material/Add';

import { CirclePlusIcon } from '@/assets/icons';
import { AddServiceCatalog } from './AddServiceCatalog';
import useServices from './useServices';
import { ServicesAction } from './ServicesAction';
const Services = () => {
  const router = useRouter();
  const theme = useTheme();
  const {
    results,
    selectedCheckboxes,
    setSelectedCheckboxes,
    open,
    setOpen,
    handleClickOpen,
  } = useServices();

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={2}
        mb={2}
      >
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1}>
          <ArrowBackIcon
            onClick={() => {
              const isMatch = services?.some(
                (service) => service?.title === router?.query?.subQuery,
              );

              if (isMatch) {
                router.push(AIR_SERVICES?.SERVICE_CATALOG);
              } else {
                router.push(AIR_SERVICES?.SERVICE_MANAGEMENT);
              }
            }}
          />
          <Typography variant="h3">Service Management</Typography>
          <ArrowForwardIosIcon fontSize="small" />
          <Typography variant="h3">Service Catalog</Typography>
          {router?.query?.subQuery && (
            <>
              <ArrowForwardIosIcon fontSize="small" />
              <Typography variant="h3">{router?.query?.subQuery}</Typography>
            </>
          )}
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'}>
          <Button
            variant="contained"
            startIcon={<CirclePlusIcon f />}
            onClick={() => router.push(AIR_SERVICES?.UPSERT_SERVICE)}
          >
            Add Service
          </Button>
        </Box>
      </Box>
      <Divider />
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={6}
          lg={3}
          borderRadius={2}
          border={`1px solid ${theme?.palette?.primary?.main}`}
          textAlign="center"
          mt={4}
          sx={{ cursor: 'pointer' }}
        >
          <Box
            alignItems={'center'}
            display={'flex'}
            justifyContent={'center'}
            flexDirection={'row'}
            height={'100%'}
            onClick={handleClickOpen}
          >
            <AddIcon color="primary" fontSize="large" />
          </Box>
          <AddServiceCatalog open={open} setOpen={setOpen} />
        </Grid>
        {services?.map((service) => (
          <Grid item xs={12} md={6} lg={3} key={service?.id}>
            <Box
              onClick={() => {
                router.push({
                  pathname: AIR_SERVICES?.SERVICE_CATALOG_SETTINGS,
                  query: {
                    subQuery: service?.title,
                  },
                });
              }}
              borderRadius={2}
              textAlign="center"
              mt={2}
              sx={{ cursor: 'pointer' }}
              bgcolor={
                router?.query?.subQuery === service?.title
                  ? `${theme?.palette?.primary?.light}`
                  : ''
              }
              border={
                router?.query?.subQuery === service?.title
                  ? `1px solid ${theme?.palette?.primary?.main}`
                  : `1px solid ${theme?.palette?.primary?.light}`
              }
            >
              <Box
                alignItems={'center'}
                display={'flex'}
                justifyContent={'center'}
                mt={2}
              >
                <Image
                  src={service?.image}
                  height={60}
                  width={60}
                  alt={`Service ${service?.id} Image`}
                />
              </Box>
              <Typography variant="h5" mt={1}>
                {service?.title}
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
              checked={results?.length === selectedCheckboxes?.length}
              onChange={(e: any) => {
                e?.target?.checked
                  ? setSelectedCheckboxes(
                      results?.map((result: any) => result?.id),
                    )
                  : setSelectedCheckboxes([]);
              }}
              color="primary"
              name="_id"
            />
            <Typography variant="h6"> Select All</Typography>
          </Box>
          <Box display={'flex'} alignItems={'center'} mr={2}>
            <CheckIcon color="primary" />
          </Box>
        </Box>
        <Box mt={6}>
          <ServicesAction />
        </Box>
      </Box>
      <Grid container spacing={2} mt={2}>
        {results?.map((result: any) => (
          <Grid item xs={12} md={6} lg={4} key={result?.id}>
            <Box
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
                        (item: any) => item === result?.id,
                      )
                    }
                    onChange={(e: any) => {
                      e?.target?.checked
                        ? setSelectedCheckboxes([
                            ...selectedCheckboxes,
                            result?.id,
                          ])
                        : setSelectedCheckboxes(
                            selectedCheckboxes?.filter(
                              (item: any) => item !== result?.id,
                            ),
                          );
                    }}
                  />
                </Box>
                <Image
                  src={result?.image}
                  height={60}
                  width={60}
                  alt={`result ${result?.id} Image`}
                />
              </Box>
              <Box alignItems={'center'} display={'flex'}>
                <Typography
                  variant="h5"
                  align="center"
                  gutterBottom
                  ml={6.5}
                  mr={1}
                  mt={2}
                >
                  {result?.title}
                </Typography>
              </Box>
              <Box alignItems={'center'} display={'flex'}>
                <Typography
                  variant="body2"
                  align="center"
                  gutterBottom
                  ml={6.5}
                  mr={1}
                >
                  User Type
                  {result?.userType && `: ${result?.userType}`}
                </Typography>
              </Box>
              <Box alignItems={'center'} display={'flex'}>
                <Typography
                  variant="body2"
                  align="center"
                  gutterBottom
                  mr={1}
                  ml={6.5}
                >
                  Status
                  {result?.status && `: ${result?.status}`}
                </Typography>
              </Box>
              <Box alignItems={'center'} display={'flex'}>
                <Typography
                  variant="body3"
                  align="center"
                  gutterBottom
                  mr={1}
                  ml={6.5}
                >
                  Category Name
                  {result?.categoryName && `: ${result?.categoryName}`}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Services;
