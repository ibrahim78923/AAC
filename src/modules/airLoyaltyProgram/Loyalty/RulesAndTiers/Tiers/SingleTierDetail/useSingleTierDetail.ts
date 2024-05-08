export const useSingleTierDetail = (props: any) => {
  const { setIsDrawerOpen } = props;

  const closeUpsertTier = () => {
    setIsDrawerOpen?.(false);
  };

  return {
    closeUpsertTier,
  };
};
