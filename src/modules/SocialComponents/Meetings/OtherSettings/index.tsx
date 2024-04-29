import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { Notification } from '../Notification';
import { Locations } from '../Locations';
import { TimeSlotPreferences } from '../TimeSlotsPreferences';

export const OtherSettings = () => {
  return (
    <>
      <HorizontalTabs
        tabsDataArray={[
          'Notification',
          'Meeting Locations',
          'Time Slots Preferences',
        ]}
      >
        <Notification />
        <Locations />
        <TimeSlotPreferences />
      </HorizontalTabs>
    </>
  );
};
