import { useState } from 'react';

export const useAssetType = () => {
  const [collapseItem, setIsCollapse] = useState<undefined | number>();
  const [subChildCollapseItem, setSubChildCollapseItem] = useState<
    undefined | number
  >();

  const handleCollapse = (item: number) => {
    setIsCollapse(collapseItem !== item ? item : undefined);
    setSubChildCollapseItem(undefined);
  };

  const handleSubChildCollapse = (item: number) => {
    setSubChildCollapseItem(subChildCollapseItem !== item ? item : undefined);
  };

  return {
    collapseItem,
    handleCollapse,
    subChildCollapseItem,
    handleSubChildCollapse,
  };
};
