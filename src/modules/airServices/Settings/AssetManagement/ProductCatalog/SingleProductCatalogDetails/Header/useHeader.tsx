import { useGetProductCatalogByIdQuery } from '@/services/airServices/settings/asset-management/product-catalog';
import { useRouter } from 'next/router';

export const useHeader = () => {
  const router = useRouter();
  const { productCatalogId } = router?.query;

  const getSingleProductCatalogParameter = {
    pathParam: { productCatalogId: productCatalogId },
  };

  const { data, isLoading } = useGetProductCatalogByIdQuery(
    getSingleProductCatalogParameter,
  );

  const title = data?.data?.[0]?.name;
  return { isLoading, router, title };
};
