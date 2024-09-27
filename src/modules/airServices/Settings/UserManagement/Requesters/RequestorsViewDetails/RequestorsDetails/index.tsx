import { EditRequestorsIcon } from '@/assets/icons';
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import UpsertRequesters from '../../UpsertRequesters';
import { RequestedTickets } from '../RequestedTickets';
import { fullName, generateImage } from '@/utils/avatarUtils';
import dayjs from 'dayjs';
import { useRequesterDetails } from './useRequesterDetails';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { DATE_TIME_FORMAT } from '@/constants';
import { TruncateText } from '@/components/TruncateText';

export const RequestorsDetails = () => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    isDrawerOpen,
    setIsDrawerOpen,
  }: any = useRequesterDetails();

  const theme = useTheme();
  if (isLoading || isFetching) return <SkeletonForm />;
  if (isError) return <ApiErrorState />;

  return (
    <>
      <Grid
        container
        borderRadius={2}
        border={`1px solid `}
        padding={2}
        borderColor={'custom.off_white_three'}
      >
        <Grid
          item
          xs={12}
          md={5}
          padding={1.5}
          borderRight={{
            md: `1px solid  ${theme?.palette?.custom?.off_white_three}`,
          }}
          borderBottom={{
            xs: `1px solid ${theme?.palette?.custom?.off_white_three}`,
            md: 'none',
          }}
        >
          <Box>
            <Box
              display={'flex'}
              flexWrap={'wrap'}
              alignItems={'center'}
              gap={3}
            >
              <Avatar
                sx={{
                  bgcolor: 'blue.main',
                  width: 150,
                  height: 150,
                }}
                src={generateImage(data?.data?.avatar?.url)}
              />
              <Box
                flex={1}
                flexDirection={'column'}
                display={'flex'}
                flexWrap={'wrap'}
              >
                <Box my={2}>
                  <Typography
                    variant="h5"
                    color="slateBlue.main"
                    fontWeight={600}
                  >
                    {
                      <TruncateText
                        text={fullName(
                          data?.data?.firstName?.toLowerCase(),
                          data?.data?.lastName?.toLowerCase(),
                        )}
                      />
                    }
                  </Typography>
                  <Typography variant="body3" fontWeight={500}>
                    {' '}
                    Joined on{' '}
                    {dayjs(data?.data?.createdAt)?.format(
                      DATE_TIME_FORMAT?.DMYHMSA,
                    )}
                  </Typography>
                </Box>
                <Box
                  display={'flex'}
                  flexWrap={'wrap'}
                  justifyContent={'space-between'}
                  marginBottom={1}
                >
                  <Typography variant="body2" fontWeight={600}>
                    Email:
                  </Typography>
                  <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                    {data?.data?.email ?? '---'}
                  </Typography>
                </Box>
                <Box
                  display={'flex'}
                  flexWrap={'wrap'}
                  justifyContent={'space-between'}
                  marginBottom={1}
                >
                  <Typography variant="body2" fontWeight={600}>
                    Phone Number
                  </Typography>
                  <Typography variant="body2">
                    {data?.data?.phoneNumber ?? '---'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={5} padding={1.5}>
          <Box display={'flex'} flexWrap={'wrap'} gap={1} my={2}>
            <Typography variant="body2" fontWeight={600}>
              Job Title
            </Typography>
            <Typography variant="body2" sx={{ flex: '1' }} />
            {<TruncateText text={data?.data?.jobTitle?.toLowerCase()} />}
          </Box>
          <Box
            display={'flex'}
            flexWrap={'wrap'}
            justifyContent={'space-between'}
            my={2}
          >
            <Typography variant="body2" fontWeight={600}>
              Email:
            </Typography>
            <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
              {data?.data?.email ?? '---'}
            </Typography>
          </Box>
          <Box
            display={'flex'}
            flexWrap={'wrap'}
            justifyContent={'space-between'}
            marginBottom={1}
          >
            <Typography variant="body2" fontWeight={600}>
              Mobile Phone
            </Typography>
            <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
              {data?.data?.phoneNumber ?? 'N/A'}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={2} textAlign={'end'}>
          <IconButton onClick={() => setIsDrawerOpen(true)}>
            <EditRequestorsIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Box py={'18px'}>
        <Typography variant="h3">Associations</Typography>
      </Box>
      <Box py={'1.125rem'}>
        <Typography variant="h6">Requested</Typography>
        <br />
        <RequestedTickets />
      </Box>
      {isDrawerOpen && (
        <UpsertRequesters
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          singleRequesterDetails={data?.data}
        />
      )}
    </>
  );
};
