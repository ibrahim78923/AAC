import TanstackTable from '@/components/Table/TanstackTable';
import { useAssets } from './useAssets';
import { assetsListData } from './Assets.data';
import AssetsHeader from './AssetsHeader';

const Assets = () => {
  const { assetsListsColumns, selectedAssetsList } = useAssets();
  return (
    <>
      <AssetsHeader selectedTicketsList={selectedAssetsList} />
      <TanstackTable
        data={assetsListData}
        columns={assetsListsColumns}
        isPagination
      />
    </>
  );
};

export default Assets;
