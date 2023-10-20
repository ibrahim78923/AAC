import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { singleSoftwareDetailTabsData } from './SingleSoftwareDetailTabs.data';
import { Overview } from '../../Overview';
import Users from '../../Users';
import { Installations } from '../../Installations';
import { Contracts } from '../../Contracts';

export const SingleSoftwareDetailTabs = () => {
  return (
    <>
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
