import { AssetsAssociateTable } from './AssetsAssociateTable';
import { AssetsAssociateHeader } from './AssetsAssociateHeader';
import { useAssetsAssociateDetail } from './useAssetsAssociateDetail';

export const AssetsAssociateDetail = () => {
  const { activeCheck, setActiveCheck } = useAssetsAssociateDetail();
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
