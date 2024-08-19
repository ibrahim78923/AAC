import { DetailCard } from './DetailCard';
import { useSingleTicketDetails } from './useSingleTicketDetails';
import Image from 'next/image';
import { Typography, Box } from '@mui/material';
import { ViewDetailCallIcon, ViewDetailMeetingIcon } from '@/assets/icons';
import { SmsImage } from '@/assets/images';
import {
  AIR_SERVICES,
  Quick_Links_Routes,
  SOCIAL_COMPONENTS,
} from '@/constants';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { MoreVert } from '@mui/icons-material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import {
  AIR_SERVICES_TICKETS_TICKETS_DETAILS,
  AIR_SERVICES_TICKETS_TICKET_LISTS,
} from '@/constants/permission-keys';
import { truncateText } from '@/utils/avatarUtils';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { LoadingButton } from '@mui/lab';
import { pxToRem } from '@/utils/getFontValue';
import StopWatch from './Details/TimeEntries/StopWatch';
import { TICKETS_ACTION_CONSTANTS } from '../TicketsLists/TicketsLists.data';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';
import { ARRAY_INDEX, MODULE_TYPE } from '@/constants/strings';

export const SingleTicketDetail = () => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    router,
    ticketId,
    singleTicketDetailDropdownOptions,
    renderPortalComponent,
    isPortalOpen,
    setIsPortalOpen,
    childComponentProps,
    singleTicketDetailTabs,
    refetch,
  } = useSingleTicketDetails?.();

  if (isLoading || isFetching) return <SkeletonTable />;

  if (isError) return <ApiErrorState canRefresh refresh={() => refetch?.()} />;

  return (
    <>
      <PageTitledHeader
        canMovedBack
        moveBack={() => router?.push(AIR_SERVICES?.TICKETS)}
        title={
          <Box display={'flex'} alignItems={'center'} gap={2}>
            <Typography variant="h6" color="primary.main">
              {data?.data?.[ARRAY_INDEX?.ZERO]?.ticketIdNumber ?? '---'}
            </Typography>
            <Typography variant="h6" component="span">
              {truncateText(data?.data?.[ARRAY_INDEX?.ZERO]?.subject)}
            </Typography>
          </Box>
        }
      >
        <StopWatch {...childComponentProps} />
        <PermissionsGuard
          permissions={[AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_MEETING]}
        >
          <LoadingButton
            sx={{ cursor: 'pointer', p: 0, minWidth: pxToRem(40) }}
            variant="outlined"
            color="inherit"
            size="small"
            className="small"
            onClick={() =>
              router?.push({
                pathname: SOCIAL_COMPONENTS?.SCHEDULE_MEETING,
                query: {
                  ticketId: ticketId,
                  moduleType: MODULE_TYPE?.TICKET,
                },
              })
            }
          >
            <ViewDetailMeetingIcon />
          </LoadingButton>
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[AIR_SERVICES_TICKETS_TICKETS_DETAILS?.CALLS]}
        >
          <LoadingButton
            sx={{ cursor: 'pointer', p: 0, minWidth: pxToRem(40) }}
            variant="outlined"
            color="inherit"
            size="small"
            className="small"
            onClick={() => router?.push(Quick_Links_Routes?.CALLING)}
          >
            <ViewDetailCallIcon />
          </LoadingButton>
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[AIR_SERVICES_TICKETS_TICKETS_DETAILS?.SENT_EMAIL]}
        >
          <LoadingButton
            sx={{ cursor: 'pointer', p: 0, minWidth: pxToRem(40) }}
            variant="outlined"
            color="inherit"
            size="small"
            className="small"
            onClick={() =>
              setIsPortalOpen?.({
                isOpen: true,
                action: TICKETS_ACTION_CONSTANTS?.EMAIL_TICKET,
              })
            }
          >
            <Image src={SmsImage} width={24} height={24} alt="Badge" />
          </LoadingButton>
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_TICKETS_TICKET_LISTS?.VIEW_TICKETS_DETAILS,
          ]}
        >
          <Box>
            <SingleDropdownButton
              dropdownOptions={singleTicketDetailDropdownOptions}
              dropdownName={<MoreVert />}
              hasEndIcon={false}
              btnVariant="text"
            />
          </Box>
        </PermissionsGuard>
      </PageTitledHeader>
      <br />
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_TICKETS_TICKETS_DETAILS?.VIEW_REQUESTER_DETAILS,
        ]}
      >
        <DetailCard {...childComponentProps} />
      </PermissionsGuard>
      <br />
      <PermissionsTabs spacing={0.3} tabsDataArray={singleTicketDetailTabs} />
      {isPortalOpen?.isOpen &&
        renderPortalComponent?.[isPortalOpen?.action as string]}
    </>
  );
};
