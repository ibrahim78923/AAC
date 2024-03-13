import { Avatar, Box, Chip, Grid, Typography, useTheme } from '@mui/material';

import { useDetailsCard } from './useDetailCard';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { fullName, generateImage } from '@/utils/avatarUtils';

export const DetailCard = () => {
  const { data: detail, isLoading, isFetching, attachFile } = useDetailsCard();

  const theme = useTheme();
  if (isLoading || isFetching) return <SkeletonForm />;
  return (
    <Box
      sx={{
        border: `2px solid ${theme?.palette?.custom?.off_white_three}`,
        borderRadius: '.5rem',
        paddingY: '1rem',
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          md={3.9}
          padding={1.5}
          borderRight={{
            md: `1px solid ${theme?.palette?.custom?.off_white_three}`,
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
              gap={1}
              marginBottom={1.5}
            >
              <Avatar
                sx={{ bgcolor: theme?.palette?.blue?.main }}
                style={{ width: 28, height: 28 }}
                src={generateImage(
                  detail?.data[0]?.requesterDetails?.avatar?.url,
                )}
              />
              <div>
                <Typography variant="body2" fontWeight={600}>
                  {' '}
                  {detail?.data[0]?.requesterDetails?.firstName.length
                    ? fullName(
                        detail?.data[0]?.requesterDetails?.firstName,
                        detail?.data[0]?.requesterDetails?.lastName,
                      )
                    : '-'}
                </Typography>
              </div>
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
                {detail?.data[0]?.requesterDetails?.email ?? '-'}
              </Typography>
            </Box>
            <Box
              display={'flex'}
              flexWrap={'wrap'}
              justifyContent={'space-between'}
              marginBottom={1}
            >
              <Typography variant="body2" fontWeight={600}>
                Created on:
              </Typography>
              <Typography variant="body2">
                {dayjs(detail?.data[0]?.requesterDetails?.createdAt)?.format(
                  DATE_FORMAT?.UI,
                ) ?? '-'}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={3.9}
          padding={1.5}
          borderRight={{
            md: `1px solid ${theme?.palette?.custom?.off_white_three}`,
          }}
          borderBottom={{
            xs: `1px solid ${theme?.palette?.custom?.off_white_three}`,
            md: 'none',
          }}
        >
          <Box display={'flex'} flexWrap={'wrap'} gap={1} marginBottom={1}>
            <Typography variant="body2" fontWeight={600}>
              Description:
            </Typography>
            <Typography
              variant="body2"
              sx={{ flex: '1' }}
              dangerouslySetInnerHTML={
                { __html: detail?.data[0]?.description } ?? '-'
              }
            />
          </Box>
          <Box display={'flex'} flexWrap={'wrap'} gap={1} marginBottom={1}>
            <Typography variant="body2" fontWeight={600}>
              Attachments:
            </Typography>
            {attachFile?.data?.length ? (
              <Box
                display={'flex'}
                alignItems={'center'}
                flexWrap={'wrap'}
                gap={1}
                marginBottom={1}
              >
                <Avatar src={generateImage(attachFile?.data?.[0]?.fileUrl)} />

                <Box>
                  <Typography variant="body2" color="slateBlue.main">
                    {detail?.filename ?? 'file-name-0.txt'}
                  </Typography>
                  <Typography variant="body3" color="grey.500">
                    {detail?.size ?? '1Kb'}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                No attachment
              </Typography>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={3.9} padding={1.5}>
          <Box
            display={'flex'}
            flexWrap={'wrap'}
            justifyContent={'space-between'}
            marginBottom={1}
          >
            <Typography variant="body2" fontWeight={600}>
              Status:
            </Typography>
            {!!detail?.data[0]?.status ? (
              <Chip
                label={detail?.data[0]?.status ?? '-'}
                variant="outlined"
                size="small"
                color="primary"
              />
            ) : (
              '--'
            )}
          </Box>
          <Box
            display={'flex'}
            flexWrap={'wrap'}
            justifyContent={'space-between'}
            marginBottom={1}
          >
            <Typography variant="body2" fontWeight={600}>
              Due by:
            </Typography>
            <Typography variant="body2">
              {dayjs(detail?.data[0]?.plannedEndDate)?.format(
                DATE_FORMAT?.UI,
              ) ?? '-'}
            </Typography>
          </Box>
          <Box
            display={'flex'}
            flexWrap={'wrap'}
            justifyContent={'space-between'}
            marginBottom={1}
          >
            <Typography variant="body2" fontWeight={600}>
              Associated By:
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'primary.main', textDecoration: 'underline' }}
            >
              {detail?.data?.[0]?.associateAssetsDetails?.[0]?.displayName ??
                '-'}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
