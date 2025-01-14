import Image from 'next/image';
import { Typography, Box } from '@mui/material';
import { ViewDetailCallIcon, ViewDetailMeetingIcon } from '@/assets/icons';
import { SmsImage } from '@/assets/images';
import { SingleDropdownButton } from '@/components/Buttons/SingleDropdownButton';
import { MoreVert } from '@mui/icons-material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import {
  AIR_SERVICES_TICKETS_TICKETS_DETAILS,
  AIR_SERVICES_TICKETS_TICKET_LISTS,
} from '@/constants/permission-keys';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { LoadingButton } from '@mui/lab';
import { pxToRem } from '@/utils/getFontValue';
import { TICKET_TYPE } from '@/constants/strings';
import { useHeader } from './useHeader';
import StopWatch from '../Details/TimeEntries/StopWatch';
import { TruncateText } from '@/components/TruncateText';

export const Header = (props: any) => {
  const {
    moveToMeetings,
    moveBack,
    moveToCall,
    openEmailPortal,
    singleTicketDetailDropdownOptions,
    ticketDetail,
    isPortalOpen,
    renderPortalComponent,
  } = useHeader(props);

  return (
    <>
      <PageTitledHeader
        canMovedBack
        moveBack={moveBack}
        title={
          <Box display={'flex'} alignItems={'center'} gap={2}>
            <Typography variant="h6" color="primary.main">
              {ticketDetail?.ticketIdNumber ?? '---'}
            </Typography>
            <Typography variant="h6" component="span">
              {ticketDetail?.ticketType === TICKET_TYPE?.SR ? (
                <TruncateText
                  text={ticketDetail?.subject}
                  retainTextLeft="Request For: "
                  size={50}
                />
              ) : (
                <TruncateText text={ticketDetail?.subject} size={50} />
              )}
            </Typography>
          </Box>
        }
      >
        <StopWatch {...props} />
        <PermissionsGuard
          permissions={[AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_MEETING]}
        >
          <LoadingButton
            sx={{ cursor: 'pointer', p: 0, minWidth: pxToRem(40) }}
            variant="outlined"
            color="inherit"
            size="small"
            className="small"
            onClick={moveToMeetings}
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
            onClick={moveToCall}
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
            onClick={openEmailPortal}
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
      {isPortalOpen?.isOpen &&
        renderPortalComponent?.[isPortalOpen?.action as string]}
    </>
  );
};
