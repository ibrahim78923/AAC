import ApiErrorState from '@/components/ApiErrorState';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';

export const useAnnouncementList = (props: any) => {
  const {
    setIsPortalOpen,
    getCustomerAnnouncementData,
    lazyGetCustomerAnnouncementStatus,
  } = props;
  const { user }: any = useAuth();

  const onClose = () => {
    setIsPortalOpen({});
  };

  useEffect(() => {
    getCustomerAnnouncementData();
  }, []);

  const isApiLoading =
    lazyGetCustomerAnnouncementStatus?.isLoading ||
    lazyGetCustomerAnnouncementStatus?.isFetching;

  const hasError = lazyGetCustomerAnnouncementStatus?.isError;

  const checkApiErrorOrLoading = () => {
    if (isApiLoading) return <SkeletonForm />;
    if (hasError)
      return <ApiErrorState canRefresh refresh={getCustomerAnnouncementData} />;
    return undefined;
  };

  return {
    onClose,
    user,
    checkApiErrorOrLoading,
  };
};
