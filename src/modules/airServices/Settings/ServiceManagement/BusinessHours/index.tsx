import { Box, Grid, Skeleton, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { ClockWithBagIcon } from '@/assets/icons';
import Link from 'next/link';
import { AIR_SERVICES } from '@/constants';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useBusinessHour } from './useBusinessHour';
import { FolderMenu } from './FolderMenu';

export const BusinessHours = () => {
  const { router, businessHoursList, isLoading } = useBusinessHour();

  return (
    <>
      <Box
        borderBottom="0.06rem solid"
        borderColor="custom.light_lavender_gray"
        mb={2.5}
      >
        <PageTitledHeader
          title="Business Hours"
          canMovedBack
          moveBack={() => router?.push(AIR_SERVICES?.SERVICE_MANAGEMENT)}
        />
      </Box>
      <Grid container spacing={3}>
        <Grid
          item
          lg={3}
          sm={6}
          xs={12}
          href={AIR_SERVICES?.UPSERT_BUSINESS_HOUR}
          component={Link}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
            height="12rem"
            border="0.06rem solid"
            borderColor="primary.main"
            borderRadius={2}
            sx={{ cursor: 'pointer' }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="2.1rem"
              height="2.1rem"
              border="0.13rem solid"
              borderColor="primary.main"
              borderRadius="50%"
            >
              <AddRoundedIcon
                sx={{
                  color: 'primary.main',
                }}
              />
            </Box>
            <Typography variant="subtitle2" color="blue.dark">
              Create New Template
            </Typography>
          </Box>
        </Grid>
        {businessHoursList?.map((businessHour: any) => (
          <Grid item lg={3} sm={6} xs={12} key={businessHour?._id}>
            <Box
              height="12rem"
              border="0.06rem solid"
              borderColor="primary.main"
              borderRadius=".5rem"
              sx={{ cursor: 'pointer' }}
              overflow="hidden"
            >
              <FolderMenu businessHourId={businessHour?._id} />
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                overflow="hidden"
                p={1}
              >
                <ClockWithBagIcon />
                <Typography
                  fontWeight={600}
                  color="blue.dark"
                  mt="0.7rem"
                  sx={{
                    textOverflow: 'break-all',
                    wordBreak: 'break-all',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {businessHour?.name}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
        {isLoading &&
          Array?.from({ length: 7 })?.map((response: any) => (
            <Grid item lg={3} sm={6} xs={12} key={response?._id}>
              <Skeleton height="12rem" variant="rectangular" />
            </Grid>
          ))}
      </Grid>
    </>
  );
};
