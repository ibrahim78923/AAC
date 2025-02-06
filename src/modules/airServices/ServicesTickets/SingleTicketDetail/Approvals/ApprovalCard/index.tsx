import { Avatar, Box, Button, Typography } from '@mui/material';
import {
  APPROVAL_CARD_INFO,
  setStatus,
  setUserDetails,
  ticketsApprovalDropdownFunction,
} from './ApprovalCard.data';
import { SingleDropdownButton } from '@/components/Buttons/SingleDropdownButton';
import { MoreVert } from '@mui/icons-material';
import { TICKET_APPROVALS } from '@/constants/strings';
import useAuth from '@/hooks/useAuth';
import { TICKET_APPROVALS_ACTIONS_CONSTANT } from '@/constants/portal-actions';
import { uiDateFormat } from '@/lib/date-time';
import { HtmlRenderer } from '@/components/DataDisplay/HtmlRenderer';

const { REJECT_TICKET_APPROVAL, APPROVE_TICKET_APPROVAL } =
  TICKET_APPROVALS_ACTIONS_CONSTANT ?? {};

export const ApprovalCard = (props: any) => {
  const { setApproval, data } = props;

  const { user }: any = useAuth();
  const ticketsApprovalDropdown = ticketsApprovalDropdownFunction(
    setApproval,
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
            sx={{ bgcolor: 'blue.main' }}
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
                {uiDateFormat(
                  data?.approvalStatus === TICKET_APPROVALS?.PENDING
                    ? data?.createdAt
                    : data?.updatedAt,
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box textAlign={'end'}>
          {data?.approvalStatus === TICKET_APPROVALS?.PENDING ? (
            data?.createdBy === user?._id ? (
              <SingleDropdownButton
                dropdownOptions={ticketsApprovalDropdown}
                dropdownName={<MoreVert />}
                hasEndIcon={false}
                btnVariant="text"
              />
            ) : (
              data?.recieverId === user?._id && (
                <Box display={'flex'} gap={1} flexWrap={'wrap'}>
                  <Button
                    className="small"
                    size="small"
                    variant="outlined"
                    color="success"
                    startIcon={
                      APPROVAL_CARD_INFO?.[TICKET_APPROVALS?.APPROVE]?.icon
                    }
                    onClick={() =>
                      setApproval?.({
                        ...data,
                        state: TICKET_APPROVALS?.APPROVE,
                        action: APPROVE_TICKET_APPROVAL,
                      })
                    }
                  >
                    Approve
                  </Button>
                  <Button
                    className="small"
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() =>
                      setApproval?.({
                        ...data,
                        state: TICKET_APPROVALS?.REJECT,
                        action: REJECT_TICKET_APPROVAL,
                      })
                    }
                    startIcon={
                      APPROVAL_CARD_INFO?.[TICKET_APPROVALS?.REJECT]?.icon
                    }
                  >
                    Reject
                  </Button>
                </Box>
              )
            )
          ) : (
            <></>
          )}
        </Box>
      </Box>
      {!!data?.description ? (
        <HtmlRenderer description={data?.description} />
      ) : (
        '---'
      )}
    </Box>
  );
};
