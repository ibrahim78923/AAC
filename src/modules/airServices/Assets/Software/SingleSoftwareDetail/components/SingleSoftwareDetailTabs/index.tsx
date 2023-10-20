import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import {
  singleSoftwareDetailTabsData,
  singleSoftwareDropdown,
} from './SingleSoftwareDetailTabs.data';
import { Overview } from '../../Overview';
import { Box, Typography } from '@mui/material';
import { ArrowLeft } from '@/assets/icons';
import { TicketsAction } from '@/modules/airServices/ServicesTickets/TicketsLists/components/TicketsAction';
import { styles } from './SingleSoftwareDetailTabs.style';
import { Installations } from '../../Installations';
import { Contracts } from '../../Contracts';
import { Users } from '../../Users';

export const SingleSoftwareDetailTabs = () => {
  return (
    <>
      <Box sx={styles.headBox}>
        <Box sx={styles.subHeadBoxBox}>
          <ArrowLeft />
          <Typography sx={styles.typography}>Software</Typography>
        </Box>
        <Box sx={styles.actionBox}>
          <TicketsAction ticketsActionDropdown={singleSoftwareDropdown} />
        </Box>
      </Box>
      <HorizontalTabs
        tabsDataArray={singleSoftwareDetailTabsData}
        border={'none'}
      >
        <Overview />
        <Installations />
        <Users />
        <Contracts />
      </HorizontalTabs>
    </>
  );
};
