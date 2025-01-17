import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  productsValidationSchema,
  productsValidationSchemaOnExistingDeals,
} from './DealsEditorDrawer.data';
import {
  usePatchDealsMutation,
  usePostDealsMutation,
} from '@/services/airSales/deals';
import {
  ASSOCIATIONS_API_PARAMS_FOR,
  DATE_FORMAT,
  associationCompanies,
} from '@/constants';
import dayjs from 'dayjs';
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
    defaultValues: {
      name: '',
      dealPipelineId: '',
      dealStageId: '',
      amount: '',
      closeDate: null,
      ownerId: '',
      priority: '',
      addLineItemId: '',
    },
  });

  const { handleSubmit, reset, watch } = methodsProducts;

  const dealPipelineId = watch('dealPipelineId');

  const onSubmit = async (values: any) => {
    delete values?.dealStatus;
    const PayloadValue = {
      name: values?.name,
      dealPipelineId: values?.dealPipelineId?._id,
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

  useEffect(() => {
    if (dealRecord && openDrawer === 'View') {
      reset({
        name: dealRecord?.name ?? '',
        dealPipelineId: dealRecord?.dealPipeline ?? '',
        dealStageId: dealRecord?.dealStage?.name ?? '',
        amount: dealRecord?.amount ?? '',
        closeDate: null,
        ownerId: dealRecord?.dealOwner?._id ?? '',
        priority: dealRecord?.priority ?? '',
        addLineItemId: dealRecord?.lineItem ?? '',
      });
    }
  }, [dealRecord]);

  return {
    handleSubmit,
    onSubmit,
    methodsProducts,
    selectedValue,
    handleChange,
    isLoading,
    dealPipelineId,
  };
};

export default useDealsEditorDrawer;
