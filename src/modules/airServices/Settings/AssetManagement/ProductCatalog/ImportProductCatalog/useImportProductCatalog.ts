import usePath from '@/hooks/usePath';
import { useRouter } from 'next/router';

export const useImportProductCatalog = (props: any) => {
  const { setIsDrawerOpen } = props;
  const router = useRouter();
  const { makePath } = usePath();

  const setDrawerDefaultState = () => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['productListAction'],
      }),
    );
    setIsDrawerOpen?.(false);
  };

  return { setDrawerDefaultState };
};
