import { DATE_TIME_FORMAT } from '@/constants';
import { TICKET_APPROVALS } from '@/constants/strings';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { Avatar, Box, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { APPROVAL_CARD_STATUS } from './ApprovalCard.data';

export const ApprovalCard = (props: any) => {
  const { data, showStatus = false, showButton = false, setApproval } = props;
  return (
    <Box
      padding={1}
      border={'1px solid'}
      borderColor={'grey.700'}
      my={1}
      borderRadius={3}
      bgcolor={'grey.100'}
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Box>
        <Box display={'flex'} gap={0.4} flexWrap={'wrap'} alignItems={'center'}>
          <Typography fontWeight={600} variant="body1" color={'blue.main'}>
            Request for :
          </Typography>
          <Typography variant="body2" fontWeight={400} color={'grey.800'}>
            {`${data?.ticketDetails?.ticketIdNumber ?? ''}, ${' '} ${
              data?.ticketDetails?.subject ?? ''
            }`}
          </Typography>
        </Box>
        <Box
          display={'flex'}
          gap={2}
          alignItems={'center'}
          flexWrap={'wrap'}
          my={1}
          justifyContent={'space-between'}
        >
          <Box display={'flex'} gap={1} flexWrap={'wrap'} alignItems={'center'}>
            <Avatar
              sx={{ bgcolor: 'blue.main' }}
              style={{ width: 25, height: 25 }}
              src={data?.requesterDetails?.profileImg?.src}
            >
              <Typography variant="body4" textTransform={'uppercase'}>
                {fullNameInitial(
                  data?.requesterDetails?.firstName,
                  data?.requesterDetails?.lastName,
                )}
              </Typography>
            </Avatar>
            <Typography color={'blue.light'}>
              {fullName(
                data?.requesterDetails?.firstName,
                data?.requesterDetails?.lastName,
              ) === 'None'
                ? ''
                : `${fullName(
                    data?.requesterDetails?.firstName,
                    data?.requesterDetails?.lastName,
                  )} sent data request`}
            </Typography>
          </Box>
          <Typography
            color={'grey.900'}
            fontSize={'0.75rem'}
            borderLeft={'1px solid'}
            borderColor={'grey.700 '}
            px={1.5}
          >
            {dayjs(data?.createdAt).format(DATE_TIME_FORMAT?.UI)}
          </Typography>
          <Typography
            color={'grey.900'}
            fontSize={'0.75rem'}
            borderLeft={'1px solid'}
            borderColor={'grey.700 '}
            px={1.5}
          >
            {!!data?.ticketDetails?.source
              ? `Via ${' '}  ${data?.ticketDetails?.source}`
              : ''}
          </Typography>
        </Box>
      </Box>
      <Box>
        {showStatus && (
          <Typography
            variant="body2"
            color={APPROVAL_CARD_STATUS?.[data?.approvalStatus]}
          >
            {data?.approvalStatus?.[0]?.toUpperCase() +
              data?.approvalStatus?.slice?.(1)?.toLowerCase()}
          </Typography>
        )}
        {showButton && (
          <Box display={'flex'} gap={1} flexWrap={'wrap'}>
            <Button
              variant="contained"
              color="success"
              onClick={() =>
                setApproval?.({ ...data, state: TICKET_APPROVALS?.APPROVE })
              }
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() =>
                setApproval?.({ ...data, state: TICKET_APPROVALS?.REJECT })
              }
            >
              Reject
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};
