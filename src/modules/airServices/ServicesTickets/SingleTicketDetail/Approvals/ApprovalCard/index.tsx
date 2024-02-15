import { fullNameInitial } from '@/utils/avatarUtils';
import { Avatar, Box, Button, Typography } from '@mui/material';
import {
  APPROVAL_CARD_INFO,
  ticketsApprovalDropdownFunction,
} from './ApprovalCard.data';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { MoreVert } from '@mui/icons-material';
import { TICKET_APPROVALS } from '@/constants/strings';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

export const ApprovalCard = (props: any) => {
  const { setApproval, data, getUpdateStatus } = props;

  const ticketsApprovalDropdown = ticketsApprovalDropdownFunction(
    getUpdateStatus,
    data,
  );
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      flexWrap={'wrap'}
      gap={1}
      p={1.5}
      border={'1px solid'}
      borderColor={'grey.900'}
      borderRadius={2}
      mt={1}
    >
      <Box>
        <Box display={'flex'} alignItems={'center'} gap={2}>
          <Avatar src={data?.imgSrc?.src} alt="img">
            {fullNameInitial(data?.name)}
          </Avatar>
          <Box>
            <Typography variant="body2" color="slateBlue.main" fontWeight={600}>
              {data?.name}
            </Typography>
            <Box display={'flex'} gap={0.5} alignItems={'center'}>
              {APPROVAL_CARD_INFO?.[data?.approvalStatus]?.icon}
              <Typography
                variant="customStyle"
                color={APPROVAL_CARD_INFO?.[data?.approvalStatus]?.color}
              >
                {APPROVAL_CARD_INFO?.[data?.approvalStatus]?.text} on{' '}
                {dayjs(data?.date).format(DATE_FORMAT?.UI)}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Typography variant="customStyle" color="slateBlue.main">
          {data?.description}
        </Typography>
      </Box>
      <Box>
        {data?.approvalStatus === TICKET_APPROVALS?.REQUESTED && (
          <SingleDropdownButton
            dropdownOptions={ticketsApprovalDropdown}
            dropdownName={<MoreVert />}
            hasEndIcon={false}
            btnVariant="text"
          />
        )}
        {data?.approvalStatus === TICKET_APPROVALS?.RECEIVED && (
          <Box display={'flex'} gap={1} flexWrap={'wrap'}>
            <Button
              variant="outlined"
              color="success"
              startIcon={APPROVAL_CARD_INFO?.[TICKET_APPROVALS?.APPROVE]?.icon}
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
              startIcon={APPROVAL_CARD_INFO?.[TICKET_APPROVALS?.REJECT]?.icon}
            >
              Reject
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};
