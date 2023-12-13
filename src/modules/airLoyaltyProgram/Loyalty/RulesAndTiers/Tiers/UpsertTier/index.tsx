import CommonDrawer from '@/components/CommonDrawer';
import { useUpsertTier } from './useUpsertTier';

export const UpsertTier = (props: any) => {
  const { isDrawerOpen, tierId } = props;
  const { closeUpsertTier, handleSubmit, submitTierForm } = useUpsertTier();
  return (
    <CommonDrawer
      isOk
      isFooterFeatureText="Define Terms"
      isDrawerOpen={isDrawerOpen}
      onClose={() => closeUpsertTier?.()}
      okText={!!tierId ? 'Update' : 'Submit'}
      title={!!tierId ? 'Edit' : 'Create'}
      submitHandler={() => handleSubmit(submitTierForm)()}
      cancelText={'Cancel'}
      footer
      isFooterFeature
    >
      <></>
    </CommonDrawer>
  );
};
