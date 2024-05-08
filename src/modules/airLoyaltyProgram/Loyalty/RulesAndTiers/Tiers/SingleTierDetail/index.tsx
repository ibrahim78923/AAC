import CommonDrawer from '@/components/CommonDrawer';
import { useSingleTierDetail } from './useSingleTierDetail';

export const SingleTierDetail = (props: any) => {
  const { isDrawerOpen } = props;
  const { closeUpsertTier } = useSingleTierDetail(props);
  return (
    <CommonDrawer
      isOk
      isDrawerOpen={isDrawerOpen}
      onClose={() => closeUpsertTier?.()}
      submitHandler={() => {}}
      cancelText={'Cancel'}
      footer
    >
      <></>
    </CommonDrawer>
  );
};
