import { useGetProductCatalogByIdQuery } from '@/services/airServices/settings/asset-management/product-catalog';
import { useRouter } from 'next/router';
import { OverviewData } from './Overview.data';

export const useOverview = () => {
  const router = useRouter();
  const { productCatalogId } = router?.query;

  const getSingleProductCatalogParameter = {
    pathParam: { productCatalogId },
  };

  const { data, isLoading, isFetching, isError } =
    useGetProductCatalogByIdQuery(getSingleProductCatalogParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!productCatalogId,
    });

  const dataArray = OverviewData(data?.data?.[0]);

  return { isLoading, dataArray, isFetching, isError };
};
