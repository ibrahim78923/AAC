import { TICKET_APPROVALS } from '@/constants/strings';
import { fullName, fullNameInitial, truncateText } from '@/utils/avatarUtils';
import { Box, Typography } from '@mui/material';
import { APPROVAL_CARD_STATUS } from './ApprovalCard.data';
import { ApprovalCardPropsI } from '../AllApprovals/AllApprovals.interface';
import { formatTimeDifference } from '@/lib/date-time';
import { UserInfo } from '@/components/UserInfo';
import { InteractiveButton } from '@/components/Buttons/InteractiveButton';

export const ApprovalCard = (props: ApprovalCardPropsI) => {
  const {
    data,
    showStatus = false,
    showButton = false,
    setApproval,
    openApprovalDetail,
  } = props;

  return (
    <Box
      padding={1}
      border={'1px solid'}
      borderColor={'grey.700'}
      my={1}
      borderRadius={3}
      bgcolor={'grey.100'}
      display={'flex'}
      gap={2}
      justifyContent={'space-between'}
      alignItems={'center'}
      sx={{ cursor: 'pointer' }}
      onClick={() => openApprovalDetail?.(data)}
    >
      <Box>
        <Box display={'flex'} gap={0.4} flexWrap={'wrap'} alignItems={'center'}>
          <Typography fontWeight={600} variant="body2" color={'blue.main'}>
            Request for :
          </Typography>
          <Typography variant="body3" fontWeight={400} color={'grey.800'}>
            {`${data?.ticketDetails?.ticketIdNumber ?? '---'}, ${' '} ${
              truncateText(data?.ticketDetails?.subject, 30) ?? '---'
            }`}
          </Typography>
        </Box>
        <Box
          display={'flex'}
          gap={2}
          alignItems={'center'}
          flexWrap={'wrap'}
          my={1}
        >
          <UserInfo
            avatarSrc={data?.requesterDetails?.avatar?.url}
            nameInitial={fullNameInitial(
              data?.requesterDetails?.firstName,
              data?.requesterDetails?.lastName,
            )}
            isNameCapital={false}
            name={
              fullName(
                data?.requesterDetails?.firstName,
                data?.requesterDetails?.lastName,
              ) === 'None'
                ? 'None'
                : `${fullName(
                    data?.requesterDetails?.firstName,
                    data?.requesterDetails?.lastName,
                  )} sent approval request`
            }
          />
          <Typography
            color={'grey.900'}
            variant="body3"
            pl={1}
            borderLeft={'1px solid'}
            borderColor={'grey.900'}
          >
            {formatTimeDifference(data?.createdAt)}
          </Typography>
          <Typography
            color={'grey.900'}
            variant="body3"
            pl={1}
            borderLeft={'1px solid'}
            borderColor={'grey.900'}
          >
            Via Portal
          </Typography>
        </Box>
      </Box>
      {showStatus && (
        <Box>
          <Typography
            variant="body3"
            sx={{ textTransform: 'capitalize' }}
            color={APPROVAL_CARD_STATUS?.[data?.approvalStatus]}
          >
            {data?.approvalStatus?.toLowerCase()}
          </Typography>
        </Box>
      )}
      {showButton && (
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'flex-end'}
          gap={1}
          flexWrap={'wrap'}
        >
          <InteractiveButton
            color="success"
            onClick={(e: any) => {
              e?.stopPropagation();
              setApproval?.({ ...data, state: TICKET_APPROVALS?.APPROVE });
            }}
          >
            Approve
          </InteractiveButton>
          <InteractiveButton
            color="error"
            onClick={(e: any) => {
              e?.stopPropagation();
              setApproval?.({ ...data, state: TICKET_APPROVALS?.REJECT });
            }}
          >
            Reject
          </InteractiveButton>
        </Box>
      )}
    </Box>
  );
};
