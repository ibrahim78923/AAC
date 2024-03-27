import Image from 'next/image';
import { Grid, Typography, Box } from '@mui/material';

import { ViewDetailBackArrowIcon, ViewDetailCallIcon } from '@/assets/icons';
import { styles } from './Header.style';
import { SmsImage } from '@/assets/images';
import { AIR_SERVICES } from '@/constants';
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

const Header = () => {
  const {
    data,
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

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent={'space-between'}
        display={'flex'}
        flexDirection={'row'}
        maxWidth={'100%'}
      >
        <Grid
          item
          sx={{
            display: 'flex',
            gap: 1,
          }}
        >
          <Box
            onClick={() => router?.push(AIR_SERVICES?.TICKETS)}
            sx={{ cursor: 'pointer' }}
          >
            <ViewDetailBackArrowIcon />
          </Box>
          <Typography variant="h6" color="primary.main">
            {data?.data?.[0]?.ticketIdNumber ?? '---'}
          </Typography>
          <Typography variant="h6" component="span">
            {truncateText(data?.data?.[0]?.subject)}
          </Typography>
        </Grid>
        <Grid item sx={{ display: 'flex', cursor: 'pointer' }}>
          {/* <PermissionsGuard
            permissions={[
              AIR_SERVICES_TICKETS_TICKETS_DETAILS?.TIME_TRACK_PLAY_PAUSE,
            ]}
          >
            <Box sx={styles?.iconBoxStyling} onClick={toggleView}>
              {isIconVisible ? (
                <ViewDetailVuesaxIcon />
              ) : (
                <Image
                  src={VuesaxErrorImage}
                  alt={'VuesaxErrorImage'}
                  height={24}
                  width={24}
                />
              )}
            </Box>
            <Box sx={styles?.iconBoxTimerStyling}>
              <DetailTimePicker />
            </Box>
          </PermissionsGuard> */}
          {/* TODO: comment for now. will be used if third party api is provided */}
          {/* <PermissionsGuard
            permissions={[AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_MEETING]}
          >
            <Box
              sx={styles?.iconBoxStyling}
              onClick={() => setDrawerOpen(true)}
            >
              <ViewDetailMeetingIcon />
            </Box>
          </PermissionsGuard> */}
          {/* <AddMeetingsDrawer open={drawerOpen} setDrawerOpen={setDrawerOpen} /> */}
          <PermissionsGuard
            permissions={[AIR_SERVICES_TICKETS_TICKETS_DETAILS?.CALLS]}
          >
            <Box sx={styles?.iconBoxStyling}>
              <ViewDetailCallIcon />
            </Box>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_SERVICES_TICKETS_TICKETS_DETAILS?.SENT_EMAIL]}
          >
            <Box
              sx={styles?.iconBoxStyling}
              marginRight={'15px !important'}
              onClick={() => setIsDrawerOpen(true)}
            >
              <Image src={SmsImage} width={24} height={24} alt="Badge" />
            </Box>
          </PermissionsGuard>
          {isDrawerOpen && (
            <NewEmailDrawer
              isDrawerOpen={isDrawerOpen}
              setIsDrawerOpen={setIsDrawerOpen}
            />
          )}
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_TICKETS_TICKET_LISTS?.VIEW_TICKETS_DETAILS,
            ]}
          >
            <Box sx={styles?.iconKabaMenuStyle}>
              <SingleDropdownButton
                dropdownOptions={ticketsApprovalDropdown}
                dropdownName={<MoreVert />}
                hasEndIcon={false}
                btnVariant="text"
              />
              {isPrintDrawerOpen && (
                <PrintDrawer
                  isPrintDrawerOpen={isPrintDrawerOpen}
                  setISPrintDrawerOpen={setIsPrintDrawerOpen}
                  data={data}
                />
              )}
            </Box>
          </PermissionsGuard>
        </Grid>
      </Grid>
      {deleteModalOpen && (
        <TicketsDelete
          deleteModalOpen={deleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          selectedTicketList={[ticketId]}
          isMoveBack
        />
      )}
    </>
  );
};

export default Header;
