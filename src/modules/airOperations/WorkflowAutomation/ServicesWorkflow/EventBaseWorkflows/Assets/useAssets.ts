import { useState } from 'react';
import { assetsListData, assetsListsColumnsFunction } from './Assets.data';

export const useAssets = () => {
  const [selectedAssetsList, setSelectedAssetsList] = useState([]);

  const assetsListsColumns = assetsListsColumnsFunction(
    selectedAssetsList,
    setSelectedAssetsList,
    assetsListData,
  );
  return {
    assetsListsColumns,
    selectedAssetsList,
  };
};
