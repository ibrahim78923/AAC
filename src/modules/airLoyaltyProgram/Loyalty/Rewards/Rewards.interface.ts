export interface SingleRewardDetailsPropsI {
  isRewardDetailsOpen: { rewardType: string };
  setIsRewardDetailsOpen: (state: {
    isOpen: boolean;
    rewardType: string;
  }) => void;
}
