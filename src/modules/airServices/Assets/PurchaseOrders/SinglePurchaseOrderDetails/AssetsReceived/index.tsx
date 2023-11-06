import { AssetsReceivedImage } from '@/assets/images';
import NoData from '@/components/NoData';
import { assetsReceiveDetailData } from './AssetsReceivedDetail/AssetsReceivedDetail.data';
import { AssetsReceivedDetail } from './AssetsReceivedDetail';

export const AssetsReceived = () => {
  return (
    <>
      {assetsReceiveDetailData?.length ? (
        <AssetsReceivedDetail />
      ) : (
        <NoData
          image={AssetsReceivedImage}
          message="Received items have not been added to inventory yet"
        />
      )}
    </>
  );
};
