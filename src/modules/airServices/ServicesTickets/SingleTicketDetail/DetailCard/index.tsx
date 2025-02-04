import { Box, Typography, useTheme } from '@mui/material';
import { useDetailCard } from './useDetailCard';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { ARRAY_INDEX } from '@/constants/strings';
import { UserInfo } from '@/components/UserInfo';
import { AttachFileCard } from '@/components/Avatars/AttachFileCard';
import { localeDateTime, otherDateFormat, uiDateFormat } from '@/lib/date-time';
import { DATE_TIME_FORMAT } from '@/constants';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { CustomChip } from '@/components/Chip/CustomChip';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { HtmlRenderer } from '@/components/DataDisplay/HtmlRenderer';

export const DetailCard = () => {
  const { attachFile, data, router, isLoading, isFetching, isError, refetch } =
    useDetailCard();
  const theme = useTheme();
  const ticketDetail = data?.data?.[ARRAY_INDEX?.ZERO];

  if (!router?.isReady) return <SkeletonTable />;

  return (
    <ApiRequestFlow
      showSkeleton={isLoading || isFetching}
      hasError={isError}
      refreshApi={refetch}
      errorHeight="40vh"
      length={3}
      skeletonType={SKELETON_TYPES?.GRID}
    >
      <Box
        border="2px solid"
        borderRadius={2}
        paddingY={2}
        borderColor="custom.off_white_three"
      >
        <ContainerGrid>
          <CustomGrid md={4}>
            <Box
              sx={{
                height: '100%',
                px: 1.5,
                borderRight: {
                  md: `1px solid ${theme?.palette?.custom?.off_white_three}`,
                },
                borderBottom: {
                  xs: `1px solid ${theme?.palette?.custom?.off_white_three}`,
                  md: 'none',
                },
              }}
            >
              <UserInfo
                boxProps={{ marginBottom: 1.5 }}
                nameInitial={fullNameInitial(
                  ticketDetail?.requesterDetails?.firstName,
                  ticketDetail?.requesterDetails?.lastName,
                )}
                name={
                  fullName(
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
                  {ticketDetail?.requesterDetails?.email ?? '---'}
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
          </CustomGrid>
          <CustomGrid md={4}>
            <Box
              sx={{
                height: '100%',
                px: 1.5,
                borderRight: {
                  md: `1px solid ${theme?.palette?.custom?.off_white_three}`,
                },
                borderBottom: {
                  xs: `1px solid ${theme?.palette?.custom?.off_white_three}`,
                  md: 'none',
                },
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
                {!!ticketDetail?.description ? (
                  <HtmlRenderer description={ticketDetail?.description} />
                ) : (
                  '---'
                )}
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
                    data={attachFile?.data?.[ARRAY_INDEX?.ZERO]}
                  />
                ) : (
                  '---'
                )}
              </Box>
            </Box>
          </CustomGrid>
          <CustomGrid md={4}>
            <Box
              sx={{
                px: 1.5,
                height: '100%',
              }}
            >
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
                  <CustomChip
                    label={ticketDetail?.status?.toLowerCase() ?? '---'}
                    variant="outlined"
                    size="small"
                    isCapital
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
                    ? otherDateFormat(
                        localeDateTime(ticketDetail?.plannedEndDate),
                        DATE_TIME_FORMAT?.FORMAT_24_HOUR,
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
                <Typography
                  variant="body2"
                  fontWeight={'fontWeightMedium'}
                  color="slateBlue.main"
                >
                  Associated By:
                </Typography>
                <Typography
                  variant="body2"
                  color="slateBlue.main"
                  textTransform={'capitalize'}
                >
                  {ticketDetail?.moduleType
                    ?.toLowerCase()
                    ?.replaceAll('_', ' ') ?? '---'}
                </Typography>
              </Box>
            </Box>
          </CustomGrid>
        </ContainerGrid>
      </Box>
    </ApiRequestFlow>
  );
};
