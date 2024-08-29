import { useEffect, useState } from 'react';
import { useLazyGetProductsPermissionsListQuery } from '@/services/airMarketer/settings/roles-and-rights';
import {
  useGetProductsQuery,
  useLazyGetCompanyAccountsListsQuery,
} from '@/services/common-APIs';
import { useForm } from 'react-hook-form';
import { PRODUCT_LABELS } from '@/constants';
import { ActiveProductI } from './Properties.interface';
import { selectCompanyDefaultValues } from './Properties.data';
import { DYNAMIC_FIELDS } from '@/utils/dynamic-forms';
import {
  PtLoyaltyIcon,
  PtCallCenterIcon,
  PtOperationIcon,
  PtSalesIcon,
  PtServiceIcon,
  PtMarketingIcon,
  PtOrgAdminIcon,
} from '@/assets/icons';

const useProperties = () => {
  const [activeProduct, setActiveProduct] = useState<ActiveProductI | null>(
    null,
  );
  const methodsSelectCompany = useForm({
    defaultValues: selectCompanyDefaultValues,
  });
  const { reset: resetSelectCompany } = methodsSelectCompany;

  const watchCompanyId = methodsSelectCompany?.watch('companyId');
  useEffect(() => {
    if (watchCompanyId) {
      setActiveProduct((prev: any) => ({
        ...prev,
        companyId: watchCompanyId._id,
      }));
    }
  }, [watchCompanyId]);

  const getProductType = (productType: string) => {
    const productTypeMap = {
      [PRODUCT_LABELS?.LOYALTY_PROGRAM]: DYNAMIC_FIELDS?.PT_LOYALTY_PROGRAM,
      [PRODUCT_LABELS?.AIR_SERVICES]: DYNAMIC_FIELDS?.PT_SERVICES,
      [PRODUCT_LABELS?.CALL_CENTER]: DYNAMIC_FIELDS?.PT_CALL_CENTER,
      [PRODUCT_LABELS?.AIR_MARKETER]: DYNAMIC_FIELDS?.PT_MARKETING,
      [PRODUCT_LABELS?.AIR_SALES]: DYNAMIC_FIELDS?.PT_SALES,
      [PRODUCT_LABELS?.AIR_OPERATIONS]: DYNAMIC_FIELDS?.PT_AIR_OPERATIONS,
      [PRODUCT_LABELS?.COMMON_FEATURES]: DYNAMIC_FIELDS?.PT_COMMON_MODULE,
      [PRODUCT_LABELS?.ORG_ADMIN]: DYNAMIC_FIELDS?.PT_ORG_ADMIN,
    };

    return productTypeMap[productType] || '';
  };

  const getProductIcon = (product: string) => {
    const productIcons = {
      [PRODUCT_LABELS?.AIR_SALES]: <PtSalesIcon />,
      [PRODUCT_LABELS?.AIR_SERVICES]: <PtServiceIcon />,
      [PRODUCT_LABELS?.AIR_MARKETER]: <PtMarketingIcon />,
      [PRODUCT_LABELS?.AIR_OPERATIONS]: <PtOperationIcon />,
      [PRODUCT_LABELS?.LOYALTY_PROGRAM]: <PtLoyaltyIcon />,
      [PRODUCT_LABELS?.CALL_CENTER]: <PtCallCenterIcon />,
      [PRODUCT_LABELS?.COMMON_FEATURES]: <PtMarketingIcon />,
      [PRODUCT_LABELS?.ORG_ADMIN]: <PtOrgAdminIcon />,
    };

    return productIcons[product] || <></>;
  };

  const handleOnClickProduct = (product: any) => {
    resetSelectCompany();
    setActiveProduct({
      _id: product?._id,
      productType: getProductType(product?.name),
    });
  };

  const { data: productList, isLoading } = useGetProductsQuery({});
  const staticProducts = [
    { _id: 'common_feature', name: PRODUCT_LABELS?.COMMON_FEATURES },
    { _id: 'org_admin', name: PRODUCT_LABELS?.ORG_ADMIN },
  ];
  const allProductList = [...(productList?.data || []), ...staticProducts];

  const companyAccounts = useLazyGetCompanyAccountsListsQuery();
  const modulesList = useLazyGetProductsPermissionsListQuery();

  return {
    activeProduct,
    setActiveProduct,
    handleOnClickProduct,
    methodsSelectCompany,
    allProductList,
    isLoading,
    companyAccounts,
    modulesList,
    getProductType,
    getProductIcon,
  };
};

export default useProperties;
