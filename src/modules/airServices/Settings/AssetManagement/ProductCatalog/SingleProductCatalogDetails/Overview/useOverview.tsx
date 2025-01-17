import { useGetProductCatalogByIdQuery } from '@/services/airServices/settings/asset-management/product-catalog';
import { useRouter } from 'next/router';
import { OverviewData } from './Overview.data';
import { ARRAY_INDEX } from '@/constants/strings';

export const useOverview = () => {
  const router = useRouter();
  const { productCatalogId } = router?.query;

  const getSingleProductCatalogParameter = {
    pathParam: { productCatalogId },
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useGetProductCatalogByIdQuery(getSingleProductCatalogParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!productCatalogId,
    });

  const dataArray = OverviewData(data?.data?.[ARRAY_INDEX?.ZERO]);

  return { isLoading, dataArray, isFetching, isError, refetch };
};
