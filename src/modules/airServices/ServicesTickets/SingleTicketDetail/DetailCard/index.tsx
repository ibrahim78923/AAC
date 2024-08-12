import { Avatar, Box, Chip, Grid, Typography, useTheme } from '@mui/material';
import { useDetailCard } from './useDetailCard';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import {
  formatFileSize,
  fullName,
  generateImage,
  getImageByType,
  truncateText,
} from '@/utils/avatarUtils';
import { ARRAY_INDEX } from '@/constants/strings';

export const DetailCard = (props: any) => {
  const { data } = props;
  const { attachFile } = useDetailCard();
  const theme = useTheme();

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
                sx={{ bgcolor: 'blue.main' }}
                style={{ width: 28, height: 28 }}
                src={generateImage(
                  data?.data[ARRAY_INDEX?.ZERO]?.requesterDetails?.avatar?.url,
                )}
              />
              <Box>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="slateBlue.main"
                >
                  {' '}
                  {fullName(
                    data?.data[ARRAY_INDEX?.ZERO]?.requesterDetails?.firstName,
                    data?.data[ARRAY_INDEX?.ZERO]?.requesterDetails?.lastName,
                  )}
                </Typography>
              </Box>
            </Box>
            <Box
              display={'flex'}
              flexWrap={'wrap'}
              justifyContent={'space-between'}
              marginBottom={1}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                color="slateBlue.main"
              >
                Email:
              </Typography>
              <Typography
                variant="body2"
                sx={{ wordBreak: 'break-all' }}
                color="slateBlue.main"
              >
                {data?.data[ARRAY_INDEX?.ZERO]?.requesterDetails?.email ??
                  '---'}
              </Typography>
            </Box>
            <Box
              display={'flex'}
              flexWrap={'wrap'}
              justifyContent={'space-between'}
              marginBottom={1}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                color="slateBlue.main"
              >
                Created on:
              </Typography>
              <Typography variant="body2" color="slateBlue.main">
                {!!data?.data[ARRAY_INDEX?.ZERO]?.requesterDetails?.createdAt
                  ? dayjs(
                      data?.data[ARRAY_INDEX?.ZERO]?.requesterDetails
                        ?.createdAt,
                    )?.format(DATE_FORMAT?.UI)
                  : '---'}
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
            <Typography variant="body2" fontWeight={600} color="slateBlue.main">
              Description:
            </Typography>
            <Typography
              variant="body2"
              color="slateBlue.main"
              sx={{ wordBreak: 'break-all' }}
              dangerouslySetInnerHTML={{
                __html: data?.data[ARRAY_INDEX?.ZERO]?.description ?? '---',
              }}
            />
          </Box>
          <Box display={'flex'} flexWrap={'wrap'} gap={1} marginBottom={1}>
            <Typography variant="body2" fontWeight={600} color="slateBlue.main">
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
                <Avatar
                  src={getImageByType(
                    attachFile?.data?.[ARRAY_INDEX?.ZERO],
                    attachFile?.data?.[ARRAY_INDEX?.ZERO]?.fileUrl,
                  )}
                />
                <Box>
                  <Typography variant="body2" color="slateBlue.main">
                    {truncateText(
                      attachFile?.data?.[ARRAY_INDEX?.ZERO]?.orignalName,
                    )}
                  </Typography>
                  <Typography variant="body3" color="grey.500">
                    {formatFileSize(
                      attachFile?.data?.[ARRAY_INDEX?.ZERO]?.fileSize,
                    )}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Typography
                variant="body2"
                color="slateBlue.main"
                sx={{ wordBreak: 'break-all' }}
              >
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
            <Typography variant="body2" fontWeight={600} color="slateBlue.main">
              Status:
            </Typography>
            {!!data?.data[ARRAY_INDEX?.ZERO]?.status ? (
              <Chip
                label={data?.data[ARRAY_INDEX?.ZERO]?.status ?? '---'}
                variant="outlined"
                size="small"
                color="primary"
              />
            ) : (
              '---'
            )}
          </Box>
          <Box
            display={'flex'}
            flexWrap={'wrap'}
            justifyContent={'space-between'}
            marginBottom={1}
          >
            <Typography variant="body2" fontWeight={600} color="slateBlue.main">
              Due by:
            </Typography>
            <Typography variant="body2" color="slateBlue.main">
              {!!data?.data[ARRAY_INDEX?.ZERO]?.plannedEndDate
                ? dayjs(data?.data[ARRAY_INDEX?.ZERO]?.plannedEndDate)?.format(
                    DATE_FORMAT?.UI,
                  )
                : '---'}
            </Typography>
          </Box>
          <Box
            display={'flex'}
            flexWrap={'wrap'}
            justifyContent={'space-between'}
            marginBottom={1}
          >
            <Typography variant="body2" fontWeight={600} color="slateBlue.main">
              Associated By:
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'primary.main', textDecoration: 'underline' }}
            >
              {data?.data?.[ARRAY_INDEX?.ZERO]?.moduleType ?? '---'}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
