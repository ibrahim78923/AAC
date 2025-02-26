import { Avatar, Box, Typography } from '@mui/material';
import {
  setStatus,
  setUserDetails,
  ticketsApprovalDropdownFunction,
} from './ApprovalCard.data';
import { MoreVert } from '@mui/icons-material';
import useAuth from '@/hooks/useAuth';
import { TICKET_APPROVALS_ACTIONS_CONSTANT } from '@/constants/portal-actions';
import { uiDateFormat } from '@/lib/date-time';
import { HtmlRenderer } from '@/components/DataDisplay/HtmlRenderer';
import { CustomButton } from '@/components/Buttons/CustomButton';
import { CUSTOM_BUTTON_TYPES } from '@/constants/mui-constant';
import { PublicSingleDropdownButton } from '@/components/Buttons/PublicSingleDropdownButton';
import { TICKET_APPROVALS } from '@/constants/services';

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
              <PublicSingleDropdownButton
                dropdownOptions={ticketsApprovalDropdown}
                dropdownName={<MoreVert />}
                hasEndIcon={false}
                btnVariant="text"
              />
            ) : (
              data?.recieverId === user?._id && (
                <Box display={'flex'} gap={1} flexWrap={'wrap'}>
                  <CustomButton
                    iconType={CUSTOM_BUTTON_TYPES?.SUCCESS}
                    color="success"
                    onClick={() =>
                      setApproval?.({
                        ...data,
                        state: TICKET_APPROVALS?.APPROVE,
                        action: APPROVE_TICKET_APPROVAL,
                      })
                    }
                  >
                    Approve
                  </CustomButton>
                  <CustomButton
                    color="error"
                    iconType={CUSTOM_BUTTON_TYPES?.REJECT}
                    onClick={() =>
                      setApproval?.({
                        ...data,
                        state: TICKET_APPROVALS?.REJECT,
                        action: REJECT_TICKET_APPROVAL,
                      })
                    }
                  >
                    Reject
                  </CustomButton>
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
