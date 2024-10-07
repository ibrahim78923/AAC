import { Box, Chip, Grid, Typography, useTheme } from '@mui/material';
import { useDetailCard } from './useDetailCard';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { ARRAY_INDEX } from '@/constants/strings';
import { UserInfo } from '@/components/UserInfo';
import { uiDateFormat } from '@/utils/dateTime';
import { AttachFileCard } from '@/components/AttachFileCard';

const { ZERO } = ARRAY_INDEX ?? {};

export const DetailCard = (props: any) => {
  const { data } = props;
  const { attachFile } = useDetailCard();
  const theme = useTheme();
  const ticketDetail = data?.data?.[ZERO];

  return (
    <Box
      border="2px solid"
      borderRadius={2}
      paddingY={2}
      borderColor="custom.off_white_three"
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
            <UserInfo
              boxProps={{ marginBottom: 1.5 }}
              nameInitial={fullNameInitial(
                ticketDetail?.requesterDetails?.firstName,
                ticketDetail?.requesterDetails?.lastName,
              )}
              name={
                !!!ticketDetail?.requesterDetails
                  ? fullName(ticketDetail?.name) ?? '---'
                  : fullName(
                      ticketDetail?.requesterDetails?.firstName,
                      ticketDetail?.requesterDetails?.lastName,
                    ) ?? '---'
              }
              avatarSrc={ticketDetail?.requesterDetails?.avatar?.url}
              nameProps={{
                color: 'slateBlue.main',
                fontWeight: 'fontWeightMedium',
                variant: 'body2',
              }}
            />
            <Box
              display={'flex'}
              flexWrap={'wrap'}
              justifyContent={'space-between'}
              marginBottom={1}
            >
              <Typography
                variant="body2"
                fontWeight={'fontWeightMedium'}
                color="slateBlue.main"
              >
                Email:
              </Typography>
              <Typography
                variant="body2"
                sx={{ wordBreak: 'break-all' }}
                color="slateBlue.main"
              >
                {!!!ticketDetail?.requesterDetails
                  ? ticketDetail?.requesterEmail ?? '---'
                  : ticketDetail?.requesterDetails?.email ?? '---'}
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
                fontWeight={'fontWeightMedium'}
                color="slateBlue.main"
              >
                Created on:
              </Typography>
              <Typography variant="body2" color="slateBlue.main">
                {!!ticketDetail?.requesterDetails?.createdAt
                  ? uiDateFormat(ticketDetail?.requesterDetails?.createdAt)
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
            <Typography
              variant="body2"
              fontWeight={'fontWeightMedium'}
              color="slateBlue.main"
            >
              Description:
            </Typography>
            <Box maxHeight={'10vh'} overflow="auto" component={'span'}>
              <Typography
                variant="body2"
                color="slateBlue.main"
                sx={{ wordBreak: 'break-all' }}
                dangerouslySetInnerHTML={{
                  __html: !!ticketDetail?.description
                    ? ticketDetail?.description
                    : '---',
                }}
              />
            </Box>
          </Box>
          <Box display={'flex'} flexWrap={'wrap'} gap={2} marginBottom={1}>
            <Typography
              variant="body2"
              fontWeight={'fontWeightMedium'}
              color="slateBlue.main"
            >
              Attachments:
            </Typography>
            {attachFile?.data?.length ? (
              <AttachFileCard
                size={{ variant: 'circular' }}
                hasStyling={false}
                canDelete={false}
                data={attachFile?.data?.[ZERO]}
              />
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
            <Typography
              variant="body2"
              fontWeight={'fontWeightMedium'}
              color="slateBlue.main"
            >
              Status:
            </Typography>
            {!!ticketDetail?.status ? (
              <Chip
                label={ticketDetail?.status ?? '---'}
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
            <Typography
              variant="body2"
              fontWeight={'fontWeightMedium'}
              color="slateBlue.main"
            >
              Due by:
            </Typography>
            <Typography variant="body2" color="slateBlue.main">
              {!!ticketDetail?.plannedEndDate
                ? uiDateFormat(ticketDetail?.plannedEndDate)
                : '---'}
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
              fontWeight={'fontWeightMedium'}
              color="slateBlue.main"
            >
              Associated By:
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'primary.main', textDecoration: 'underline' }}
            >
              {ticketDetail?.moduleType ?? '---'}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
