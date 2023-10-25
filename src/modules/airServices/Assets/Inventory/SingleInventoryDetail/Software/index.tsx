import NoData from '@/components/NoData';
import NoSoftwareFound from '@/assets/images/modules/LogitechMouse/Expense.png';
import { softwareData } from './software.data';
import { InventoryCard } from '@/components/InventoryCard/index';

import { v4 as uuidv4 } from 'uuid';

export const Software = () => {
  return (
    <>
      {!!softwareData?.length ? (
        softwareData?.map((singleSoftware: any) => (
          <InventoryCard
            heading={singleSoftware.heading}
            status={singleSoftware.status}
            key={uuidv4()}
          />
        ))
      ) : (
        <NoData image={NoSoftwareFound} message={'No Software found'} />
      )}
    </>
  );
};
