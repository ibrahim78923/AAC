import { assetsReceivedImage } from '@/assets/images';
import NoData from '@/components/NoData';
import { assetsReceiveData } from './AssetsReceivedDetail/AssetsReceived.data';
import { AssetsReceivedDetail } from './AssetsReceivedDetail';

export const AssetsReceived = () => {
  return (
    <>
      {assetsReceiveData?.length ? (
        <AssetsReceivedDetail />
      ) : (
        <NoData
          image={assetsReceivedImage}
          message="Received items have not been added to inventory yet"
        />
      )}
    </>
  );
};
