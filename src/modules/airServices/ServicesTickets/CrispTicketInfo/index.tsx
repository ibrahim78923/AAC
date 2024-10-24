import { TruncateText } from '@/components/TruncateText';
import { UserInfo } from '@/components/UserInfo';
import { TICKET_TYPE } from '@/constants/strings';
import { formatTimeDifference } from '@/lib/date-time';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { Box, Typography } from '@mui/material';

export const CrispTicketInfo = (props: any) => {
  const { singleTicketDetail } = props;
  return (
    <>
      <Typography
        variant="h6"
        mb={0.5}
        fontWeight={'fontWeightMedium'}
        color="slateBlue.main"
      >
        Primary
      </Typography>
      <Box
        padding={1.5}
        borderRadius={2}
        border={`1px solid`}
        borderColor={'custom.off_white_three'}
      >
        <Box
          display={'flex'}
          alignItems={'center'}
          gap={2}
          flexWrap={'wrap'}
          mb={0.5}
        >
          <UserInfo
            nameInitial={fullNameInitial(
              singleTicketDetail?.departmentDetails?.name,
            )}
            name={singleTicketDetail?.ticketIdNumber}
            avatarSrc={singleTicketDetail?.attachment?.fileUrl}
            avatarSize={{ variant: 'rounded', height: 25, width: 25 }}
          />
          <Typography color={'grey.900'} variant="body3">
            Request for{' '}
            {fullName(
              singleTicketDetail?.requesterDetails?.firstName,
              singleTicketDetail?.requesterDetails?.lastName,
            )}
          </Typography>
          <Typography
            color="secondary"
            variant="body3"
            fontWeight={'fontWeightMedium'}
            sx={{ wordBreak: 'break-all' }}
          >
            {singleTicketDetail?.ticketType === TICKET_TYPE?.SR ? (
              <TruncateText
                text={singleTicketDetail?.subject}
                retainTextLeft="Request For: "
              />
            ) : (
              <TruncateText text={singleTicketDetail?.subject} />
            )}
          </Typography>
        </Box>
        <Typography color={'grey.900'} variant="body3" component={'div'}>
          From :{' '}
          <Typography component={'span'} color="secondary" variant="body3">
            {fullName(
              singleTicketDetail?.requesterDetails?.firstName,
              singleTicketDetail?.requesterDetails?.lastName,
            )}
          </Typography>
        </Typography>
        <Typography color="grey.900" variant="body3" component={'div'}>
          Created :{' '}
          <Typography component={'span'} color="secondary" variant="body3">
            {formatTimeDifference(singleTicketDetail?.createdAt)}
          </Typography>
        </Typography>
      </Box>
    </>
  );
};
