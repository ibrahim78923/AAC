import { useGetProductCatalogByIdQuery } from '@/services/airServices/settings/asset-management/product-catalog';
import { useRouter } from 'next/router';
import { OverviewData } from './Overview.data';

export const useOverview = () => {
  const router = useRouter();
  const { productCatalogId } = router?.query;

  const getSingleProductCatalogParameter = {
    pathParam: { productCatalogId: productCatalogId },
  };

  const { data, isLoading } = useGetProductCatalogByIdQuery(
    getSingleProductCatalogParameter,
  );

  const dataArray = OverviewData(data?.data?.[0]);

  return { isLoading, dataArray };
};
