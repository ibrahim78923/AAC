import TanstackTable from '@/components/Table/TanstackTable';
import Header from '../Tickets/Header';
import { useAssets } from '../Assets/useAssets';
import { assetsListData } from '../Assets/Assets.data';

const Assets = () => {
  const { assetsListsColumns, selectedAssetsList } = useAssets();
  return (
    <>
      <Header selectedTicketsList={selectedAssetsList} />
      <TanstackTable
        data={assetsListData}
        columns={assetsListsColumns}
        isPagination
      />
    </>
  );
};

export default Assets;
