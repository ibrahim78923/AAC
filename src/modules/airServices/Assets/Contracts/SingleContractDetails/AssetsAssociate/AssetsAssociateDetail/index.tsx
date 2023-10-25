import { AssetsAssociateTable } from './AssetsAssociateTable';
import { AssetsAssociateHeader } from './AssetsAssociateHeader';
import { useAssetAssociate } from '../useAssetAssociate';

export const AssetsAssociateDetail = () => {
  const { activeCheck, setActiveCheck } = useAssetAssociate();
  return (
    <>
      <AssetsAssociateHeader activeCheck={activeCheck} />
      <br />
      <AssetsAssociateTable
        activeCheck={activeCheck}
        setActiveCheck={setActiveCheck}
      />
    </>
  );
};
