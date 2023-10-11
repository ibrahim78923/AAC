import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { singleSoftwareDetailTabsData } from './SingleSoftwareDetailTabs.data';
import { Overview } from '../../Overview';
import { Installations } from '../../Installations';
import { Users } from '../../Users';
import { Contracts } from '../../Contracts';

export const SingleSoftwareDetailTabs = () => {
  return (
    <HorizontalTabs tabsDataArray={singleSoftwareDetailTabsData}>
      <Overview />
      <Installations />
      <Users />
      <Contracts />
    </HorizontalTabs>
  );
};
