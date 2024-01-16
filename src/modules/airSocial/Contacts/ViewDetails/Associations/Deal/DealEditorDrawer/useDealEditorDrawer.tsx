import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  productsDefaultValues,
  productsValidationSchema,
} from './DealEditorDrawer.data';
import {
  useGetDealsLifecycleStageQuery,
  useGetDealPipeLineQuery,
  useGetAddLineItemsQuery,
} from '@/services/airSales/deals';
import useAuth from '@/hooks/useAuth';
import { useGetOrganizationUsersQuery } from '@/services/dropdowns';

const useDealEditorDrawer = () => {
  const { user }: any = useAuth();

  const { data: dealOwners } = useGetOrganizationUsersQuery(
    user?.organization?._id,
  );
  const dealOwnersData = dealOwners?.data?.users?.map((user: any) => ({
    value: user?._id,
    label: `${user?.firstName} ${user?.lastName}`,
  }));

  const { data: dealStages } = useGetDealsLifecycleStageQuery({});
  const dealStagesData = dealStages?.data?.lifecycleStages?.map(
    (stage: any) => ({
      value: stage?._id,
      label: stage?.name,
    }),
  );

  const { data: dealPipeline } = useGetDealPipeLineQuery({ meta: false });
  const dealPipelineData = dealPipeline?.data?.map((pipeLine: any) => ({
    value: pipeLine?._id,
    label: pipeLine?.name,
  }));

  const { data: addLineItems } = useGetAddLineItemsQuery({});
  const addLineItemsData = addLineItems?.data?.salesproducts?.map(
    (item: any) => ({
      value: item?._id,
      label: item?.name,
    }),
  );

  const [dealType, setDealType] = useState('newDeal');
  const handleChangeDealType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDealType((event.target as HTMLInputElement).value);
  };

  const [searchProduct, setSearchProduct] = useState('');
  const methodsProducts = useForm({
    resolver: yupResolver(productsValidationSchema),
    defaultValues: productsDefaultValues,
  });

  const onSubmit = () => {};
  const { handleSubmit } = methodsProducts;

  return {
    dealPipelineData,
    dealStagesData,
    dealOwnersData,
    addLineItemsData,
    dealType,
    handleChangeDealType,
    handleSubmit,
    onSubmit,
    methodsProducts,
    searchProduct,
    setSearchProduct,
  };
};

export default useDealEditorDrawer;
