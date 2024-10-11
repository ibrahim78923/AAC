import { InventoryCard } from '@/components/InventoryCard';
import NoData from '@/components/NoData';
import { DATE_TIME_FORMAT } from '@/constants';
import { LoadingButton } from '@mui/lab';
import { Box, Chip, Divider, Skeleton, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Fragment } from 'react';
import { useSingleTicketDetail } from './useSingleTicketDetail';
import { TICKET_STATUS } from '@/constants/strings';
import { SingleTicketDetailPropsI } from './SingleTicketDetail.interface';
import { CHECK_SURVEY_SUBMISSION_STATUS } from '../../Tickets.data';
import { customizePortalDefaultValues } from '@/layout/CustomerPortal/CustomerPortal.data';

export const SingleTicketDetail = (props: SingleTicketDetailPropsI) => {
  const {
    singleTicketData,
    lazyGetSingleDefaultSurveyForCustomerTicketsStatus,
    isLoader,
    lazyCheckSingleDefaultSurveySubmittedForRequesterStatus,
  } = props;

  const { theme, getCustomerSurvey, portalStyles } =
    useSingleTicketDetail(props);

  return (
    <>
      <Box display={'flex'} gap={1} flexWrap={'wrap'}>
        <Box flex={0.8}>
          <Typography
            fontWeight={700}
            variant="body1"
            color={'slateBlue.main'}
            mb={1}
          >
            {singleTicketData?.subject}
          </Typography>
          <Typography variant="body2" color={'grey.0'} fontWeight={500}>
            {`Created On  ${dayjs(singleTicketData?.createdAt)?.format(
              DATE_TIME_FORMAT?.UI,
            )}`}
            <Typography
              component="span"
              fontWeight={500}
              variant="body2"
              color="primary.main"
            >
              {' '}
              - Via Portal
            </Typography>
          </Typography>
          <br />
          <Typography mb={1} color={'grey.0'} variant="body1">
            Description:
          </Typography>
          {!!singleTicketData?.description ? (
            <Box
              height={'20rem'}
              overflow={'scroll'}
              dangerouslySetInnerHTML={{
                __html: singleTicketData?.description,
              }}
            />
          ) : (
            <Typography>No description available</Typography>
          )}
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            margin: '0 2rem',
            border: `.1rem solid ${theme?.palette?.grey[700]}`,
            backgroundColor: 'transparent',
          }}
        />
        <Box>
          <Typography
            variant="body1"
            fontWeight={700}
            color="slateBlue.main"
            mb={1}
          >
            Status
          </Typography>
          <Box>
            {singleTicketData?.status ? (
              <Chip
                label={singleTicketData?.status}
                sx={{ backgroundColor: 'custom.bright', color: 'white' }}
              />
            ) : null}
          </Box>
          {isLoader ? (
            <Skeleton
              variant="rectangular"
              width={100}
              height={80}
              sx={{ my: 2 }}
            />
          ) : (
            [TICKET_STATUS?.CLOSED, TICKET_STATUS?.RESOLVED]?.includes(
              singleTicketData?.status,
            ) &&
            !!lazyGetSingleDefaultSurveyForCustomerTicketsStatus?.data?.data
              ?._id && (
              <Box
                py={2}
                pr={4}
                pl={1.5}
                mt={1}
                bgcolor={'common.white'}
                boxShadow={2}
                border={'1px solid'}
                borderColor={'custom.off_white_three'}
                borderRadius={2}
              >
                <Typography
                  variant="body1"
                  fontWeight={700}
                  color="slateBlue.main"
                  mb={1}
                >
                  Customer Survey
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={400}
                  component={'div'}
                  color="primary"
                  mb={1}
                >
                  {lazyCheckSingleDefaultSurveySubmittedForRequesterStatus?.data
                    ?.message === CHECK_SURVEY_SUBMISSION_STATUS?.SUBMITTED &&
                    'Submitted'}
                </Typography>
                <LoadingButton
                  onClick={() => getCustomerSurvey?.()}
                  variant="contained"
                  className="small"
                  sx={{
                    bgcolor:
                      portalStyles?.btnPrimary ||
                      customizePortalDefaultValues(theme)?.btnPrimary,
                    color: 'common.white',
                    '&:hover': {
                      bgcolor:
                        portalStyles?.btnPrimary ||
                        customizePortalDefaultValues(theme)?.btnPrimary,
                      color: 'common.white',
                    },
                    '&.Mui-disabled': {
                      bgcolor:
                        portalStyles?.btnPrimary ||
                        customizePortalDefaultValues(theme)?.btnPrimary,
                    },
                  }}
                  disabled={
                    lazyCheckSingleDefaultSurveySubmittedForRequesterStatus
                      ?.data?.message ===
                    CHECK_SURVEY_SUBMISSION_STATUS?.SUBMITTED
                  }
                >
                  {lazyGetSingleDefaultSurveyForCustomerTicketsStatus?.data
                    ?.data?.displayName || 'Take a Survey'}
                </LoadingButton>
              </Box>
            )
          )}
        </Box>
      </Box>
      <br />
      <Typography variant="body2" color="slateBlue.main">
        {' '}
        {`Assets (${singleTicketData?.associateAssetsDetails?.length})`}
      </Typography>
      <Box
        maxHeight={'30vh'}
        overflow={'auto'}
        mt={1}
        border={'2px solid'}
        borderColor={'custom.off_white'}
        p={1}
        borderRadius={2}
      >
        {!!singleTicketData?.associateAssetsDetails?.length ? (
          <>
            {singleTicketData?.associateAssetsDetails?.map((item: any) => (
              <Fragment key={item?._id}>
                <InventoryCard
                  heading={item?.displayName}
                  key={item?._id}
                  hasDeleteIcon={false}
                />
              </Fragment>
            ))}
          </>
        ) : (
          <NoData message="No assets found" height="100%" />
        )}
      </Box>
    </>
  );
};
