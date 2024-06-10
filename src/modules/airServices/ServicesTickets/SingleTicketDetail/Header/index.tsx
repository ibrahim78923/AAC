import Image from 'next/image';
import { Typography, Box } from '@mui/material';
import { ViewDetailCallIcon, ViewDetailMeetingIcon } from '@/assets/icons';
import { styles } from './Header.style';
import { SmsImage } from '@/assets/images';
import {
  AIR_SERVICES,
  Quick_Links_Routes,
  SOCIAL_COMPONENTS,
} from '@/constants';
import { NewEmailDrawer } from './NewEmailDrawer';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { MoreVert } from '@mui/icons-material';
import { PrintDrawer } from './Print';
import { useHeader } from './useHeader';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import {
  AIR_SERVICES_TICKETS_TICKETS_DETAILS,
  AIR_SERVICES_TICKETS_TICKET_LISTS,
} from '@/constants/permission-keys';
import { TicketsDelete } from '../../TicketsDelete';
import { truncateText } from '@/utils/avatarUtils';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { Skeleton } from '@mui/lab';

const Header = (props: any) => {
  const { apiStatus, data } = props;

  const {
    router,
    setIsDrawerOpen,
    isDrawerOpen,
    ticketsApprovalDropdown,
    isPrintDrawerOpen,
    setIsPrintDrawerOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    ticketId,
  } = useHeader();

  if (apiStatus?.isLoading || apiStatus?.isFetching) return <Skeleton />;

  return (
    <>
      <Box
        justifyContent={'space-between'}
        display={'flex'}
        alignItems={'center'}
        gap={1}
        flexWrap={'wrap'}
      >
        <PageTitledHeader
          canMovedBack
          moveBack={() => router?.push(AIR_SERVICES?.TICKETS)}
          title={
            <Box display={'flex'} alignItems={'center'} gap={2}>
              <Typography variant="h6" color="primary.main">
                {data?.data?.[0]?.ticketIdNumber ?? '---'}
              </Typography>
              <Typography variant="h6" component="span">
                {truncateText(data?.data?.[0]?.subject)}
              </Typography>
            </Box>
          }
        />
        <Box display={'flex'} alignItems={'center'} gap={1} flexWrap={'wrap'}>
          <PermissionsGuard
            permissions={[AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_MEETING]}
          >
            <Box
              sx={styles?.iconBoxStyling}
              onClick={() =>
                router?.push({
                  pathname: SOCIAL_COMPONENTS?.SCHEDULE_MEETING,
                  query: {
                    ticketId: ticketId,
                  },
                })
              }
            >
              <ViewDetailMeetingIcon />
            </Box>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_SERVICES_TICKETS_TICKETS_DETAILS?.CALLS]}
          >
            <Box
              sx={styles?.iconBoxStyling}
              onClick={() => router?.push(Quick_Links_Routes?.CALLING)}
            >
              <ViewDetailCallIcon />
            </Box>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_SERVICES_TICKETS_TICKETS_DETAILS?.SENT_EMAIL]}
          >
            <Box
              sx={styles?.iconBoxStyling}
              onClick={() => setIsDrawerOpen(true)}
            >
              <Image src={SmsImage} width={24} height={24} alt="Badge" />
            </Box>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_TICKETS_TICKET_LISTS?.VIEW_TICKETS_DETAILS,
            ]}
          >
            <Box>
              <SingleDropdownButton
                dropdownOptions={ticketsApprovalDropdown}
                dropdownName={<MoreVert />}
                hasEndIcon={false}
                btnVariant="text"
              />
            </Box>
          </PermissionsGuard>
        </Box>
      </Box>
      {deleteModalOpen && (
        <TicketsDelete
          deleteModalOpen={deleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          selectedTicketList={[ticketId]}
          isMoveBack
        />
      )}
      {isPrintDrawerOpen && (
        <PrintDrawer
          isPrintDrawerOpen={isPrintDrawerOpen}
          setISPrintDrawerOpen={setIsPrintDrawerOpen}
          data={data}
        />
      )}
      {isDrawerOpen && (
        <NewEmailDrawer
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      )}
    </>
  );
};

export default Header;
