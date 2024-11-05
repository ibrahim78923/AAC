import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  productsDefaultValues,
  productsValidationSchema,
  productsValidationSchemaOnExistingDeals,
} from './DealsEditorDrawer.data';
import {
  useGetDealsLifecycleStageQuery,
  usePatchDealsMutation,
  usePostDealsMutation,
} from '@/services/airSales/deals';
import {
  ASSOCIATIONS_API_PARAMS_FOR,
  DATE_FORMAT,
  associationCompanies,
} from '@/constants';
import dayjs from 'dayjs';
import { useGetPipelineQuery } from '@/services/common-APIs';
import { usePostAssociationCompaniesMutation } from '@/services/commonFeatures/companies';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

const useDealsEditorDrawer = ({
  openDrawer,
  setOpenDrawer,
  companyId,
  dealRecord,
}: any) => {
  const [postDeals, { isLoading }] = usePostDealsMutation();
  const [updatedAssignDeal] = usePatchDealsMutation();

  const { data: DealsLifecycleStageData } = useGetDealsLifecycleStageQuery({});
  const { data: pipelineData } = useGetPipelineQuery({});

  const [PostAssociationCompanies] = usePostAssociationCompaniesMutation();

  const [selectedValue, setSelectedValue] = useState('New Deal');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const methodsProducts = useForm({
    resolver: yupResolver(
      selectedValue === associationCompanies?.newDeal
        ? productsValidationSchema
        : productsValidationSchemaOnExistingDeals,
    ),
    defaultValues: async () => {
      if (dealRecord) {
        const {
          name,
          dealPipelineId,
          dealStageId,
          amount,
          closeDate,
          ownerId,
          priority,
          addLineItemId,
        } = dealRecord;
        return {
          name,
          dealPipelineId,
          dealStageId,
          amount,
          closeDate: new Date(closeDate),
          ownerId,
          priority,
          addLineItemId,
        };
      }
      return productsDefaultValues;
    },
  });

  const { handleSubmit, reset } = methodsProducts;

  const onSubmit = async (values: any) => {
    delete values?.dealStatus;
    const PayloadValue = {
      name: values?.name,
      dealPipelineId: values?.dealPipelineId,
      dealStageId: values?.dealStageId,
      amount: values?.amount,
      closeDate: dayjs(values?.closeDate)?.format(DATE_FORMAT?.API),
      ownerId: values?.ownerId,
      ...(values?.priority && { priority: values?.priority }),
      products: [
        {
          productId: values?.addLineItemId,
          quantity: 1,
          unitDiscount: 0,
        },
      ],
    };
    delete values?.addLineItemId;
    if (PayloadValue?.closeDate === associationCompanies?.invalidDate) {
      delete PayloadValue?.closeDate;
    }

    try {
      let res: any;
      if (selectedValue === associationCompanies?.newDeal) {
        openDrawer === 'Edit'
          ? await updatedAssignDeal({
              id: dealRecord?._id,
              body: values,
            }).unwrap()
          : (res = await postDeals({ body: PayloadValue })?.unwrap());
      }

      const payload = {
        recordId: companyId?.companyId,
        recordType: ASSOCIATIONS_API_PARAMS_FOR?.COMPANIES,
        operation: ASSOCIATIONS_API_PARAMS_FOR?.ADD,
        dealIds: [res?.data?._id],
      };
      if (res) {
        await PostAssociationCompanies({ body: payload }).unwrap();
        successSnackbar(`Deal Added Successfully`);
      }

      setOpenDrawer('');
      reset();
    } catch (error) {
      errorSnackbar('something went wrong');
    }
  };

  return {
    handleSubmit,
    onSubmit,
    methodsProducts,

    DealsLifecycleStageData,
    selectedValue,
    handleChange,
    pipelineData,
    isLoading,
  };
};

export default useDealsEditorDrawer;
