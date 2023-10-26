import NoData from '@/components/NoData';
import { softwareData } from './software.data';
import { InventoryCard } from '@/components/InventoryCard/index';

import { v4 as uuidv4 } from 'uuid';
import { expenseImage } from '@/assets/images';

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
        <NoData image={expenseImage} message={'No Software found'} />
      )}
    </>
  );
};
