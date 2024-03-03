import { Avatar, Box, Button, Typography } from '@mui/material';
import {
  APPROVAL_CARD_INFO,
  setStatus,
  setUserDetails,
  ticketsApprovalDropdownFunction,
} from './ApprovalCard.data';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { MoreVert } from '@mui/icons-material';
import { TICKET_APPROVALS } from '@/constants/strings';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@/constants';
import useAuth from '@/hooks/useAuth';

export const ApprovalCard = (props: any) => {
  const { setApproval, data, getUpdateStatus } = props;
  const { user }: any = useAuth();
  const ticketsApprovalDropdown = ticketsApprovalDropdownFunction(
    getUpdateStatus,
    data,
  );

  return (
    <Box
      p={1.5}
      border={'1px solid'}
      borderColor={'grey.900'}
      borderRadius={2}
      mt={1}
    >
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={1}
        mb={1}
      >
        <Box display={'flex'} alignItems={'center'} gap={2}>
          <Avatar
            src={setUserDetails(data, user?._id, data?.createdBy)?.avatar}
            alt="img"
            sx={{ bgcolor: 'blue' }}
          >
            <Typography variant="body2" textTransform={'uppercase'}>
              {setUserDetails(data, user?._id, data?.createdBy)?.nameInitial}
            </Typography>
          </Avatar>
          <Box>
            <Typography variant="body2" color="slateBlue.main" fontWeight={600}>
              {setUserDetails(data, user?._id, data?.createdBy)?.name}
            </Typography>
            <Box display={'flex'} gap={0.5} alignItems={'center'}>
              {
                setStatus?.(
                  data?.approvalStatus,
                  data?.recieverId,
                  user?._id,
                  data?.createdBy,
                )?.icon
              }
              <Typography
                variant="customStyle"
                color={
                  setStatus?.(
                    data?.approvalStatus,
                    data?.recieverId,
                    user?._id,
                    data?.createdBy,
                  )?.color
                }
              >
                {
                  setStatus?.(
                    data?.approvalStatus,
                    data?.recieverId,
                    user?._id,
                    data?.createdBy,
                  )?.text
                }{' '}
                on{' '}
                {dayjs(
                  data?.approvalStatus === TICKET_APPROVALS?.PENDING
                    ? data?.createdAt
                    : data?.updatedAt,
                ).format(DATE_TIME_FORMAT?.UI)}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          {data?.approvalStatus === TICKET_APPROVALS?.PENDING &&
            data?.createdBy === user?._id && (
              <SingleDropdownButton
                dropdownOptions={ticketsApprovalDropdown}
                dropdownName={<MoreVert />}
                hasEndIcon={false}
                btnVariant="text"
              />
            )}
          {data?.approvalStatus === TICKET_APPROVALS?.PENDING &&
            data?.recieverId === user?._id && (
              <Box display={'flex'} gap={1} flexWrap={'wrap'}>
                <Button
                  variant="outlined"
                  color="success"
                  startIcon={
                    APPROVAL_CARD_INFO?.[TICKET_APPROVALS?.APPROVE]?.icon
                  }
                  onClick={() =>
                    setApproval?.({ ...data, state: TICKET_APPROVALS?.APPROVE })
                  }
                >
                  Approve
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() =>
                    setApproval?.({ ...data, state: TICKET_APPROVALS?.REJECT })
                  }
                  startIcon={
                    APPROVAL_CARD_INFO?.[TICKET_APPROVALS?.REJECT]?.icon
                  }
                >
                  Reject
                </Button>
              </Box>
            )}
        </Box>
      </Box>
      <Typography
        variant="customStyle"
        color="slateBlue.main"
        dangerouslySetInnerHTML={{ __html: data?.description }}
      />
    </Box>
  );
};
