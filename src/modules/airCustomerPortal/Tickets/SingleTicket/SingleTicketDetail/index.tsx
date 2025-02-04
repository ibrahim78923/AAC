import { InventoryCard } from '@/components/Cards/InventoryCard';
import { DATE_TIME_FORMAT } from '@/constants';
import { LoadingButton } from '@mui/lab';
import { Box, Skeleton, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useSingleTicketDetail } from './useSingleTicketDetail';
import { TICKET_STATUS } from '@/constants/strings';
import { SingleTicketDetailPropsI } from './SingleTicketDetail.interface';
import { CHECK_SURVEY_SUBMISSION_STATUS } from '../../Tickets.data';
import { customizePortalDefaultValues } from '@/layout/CustomerPortal/CustomerPortal.data';
import { otherDateFormat } from '@/lib/date-time';
import { capitalizeFirstLetter } from '@/utils/api';
import { CustomChip } from '@/components/Chip/CustomChip';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { Attachments } from '@/components/Attachments';
import { HtmlRenderer } from '@/components/DataDisplay/HtmlRenderer';

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
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box flex={1}>
          <Typography
            fontWeight={700}
            variant="body1"
            color={'slateBlue.main'}
            mb={1}
          >
            {singleTicketData?.subject}
          </Typography>
          <Typography variant="body2" color={'grey.0'} fontWeight={500}>
            {`Created On  ${otherDateFormat(
              singleTicketData?.createdAt,
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
            <HtmlRenderer
              maxHeight="none"
              description={singleTicketData?.description}
            />
          ) : (
            <Typography>No description available</Typography>
          )}
        </Box>
        <Box
          sx={{
            flex: 0.3,
            borderLeft: {
              md: `2px solid ${theme?.palette?.grey?.[700]}`,
              xs: 'none',
            },
            borderTop: {
              md: 'none',
              xs: `1px solid ${theme?.palette?.grey?.[700]}`,
            },
            padding: 1,
          }}
        >
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
              <CustomChip
                label={capitalizeFirstLetter(singleTicketData?.status)}
                size="medium"
                backgroundColor="custom.bright"
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
      {!!singleTicketData?._id && (
        <>
          <Typography
            variant="body1"
            fontWeight="fontWeightMedium"
            color="slateBlue.main"
            my={2}
          >
            Attachments
          </Typography>
          <Box>
            <Attachments
              recordId={singleTicketData?._id as string}
              size={{ width: '100%', height: '100%' }}
              hasNoDeletePermission
              hasStyling={false}
              canDelete={false}
            />
          </Box>
        </>
      )}
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
        <ApiRequestFlow
          hasNoData={!singleTicketData?.associateAssetsDetails?.length}
          noDataMessage="No assets found"
          noDataHeight="100%"
        >
          {singleTicketData?.associateAssetsDetails?.map((item: any) => (
            <Fragment key={item?._id}>
              <InventoryCard
                heading={item?.displayName}
                key={item?._id}
                hasDeleteIcon={false}
              />
            </Fragment>
          ))}
        </ApiRequestFlow>
      </Box>
    </>
  );
};
