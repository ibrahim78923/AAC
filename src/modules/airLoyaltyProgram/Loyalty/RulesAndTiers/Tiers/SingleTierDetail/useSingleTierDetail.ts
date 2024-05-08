import usePath from '@/hooks/usePath';
import { useRouter } from 'next/router';

export const useSingleTierDetail = (props: any) => {
  const { setIsDrawerOpen } = props;
  const router = useRouter();
  const { makePath } = usePath();

  const closeUpsertTier = () => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['rulesAndTierAction'],
      }),
    );
    setIsDrawerOpen?.(false);
  };

  return {
    closeUpsertTier,
  };
};
