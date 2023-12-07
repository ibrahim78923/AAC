import { useState } from 'react';
import { assetsListData, assetsListsColumnsFunction } from './Assets.data';
import { useTheme } from '@mui/material';

export const useAssets = () => {
  const theme = useTheme();
  const [selectedAssetsList, setSelectedAssetsList] = useState([]);

  const assetsListsColumns = assetsListsColumnsFunction(
    selectedAssetsList,
    setSelectedAssetsList,
    assetsListData,
    theme,
  );
  return {
    assetsListsColumns,
    selectedAssetsList,
  };
};
