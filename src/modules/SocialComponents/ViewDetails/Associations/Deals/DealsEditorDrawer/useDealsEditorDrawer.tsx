import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  productsDefaultValues,
  productsValidationSchema,
} from './DealsEditorDrawer.data';
import {
  usePatchDealsMutation,
  usePostDealsMutation,
} from '@/services/airSales/deals';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useCreateAssociationMutation } from '@/services/airSales/deals/view-details/association';

const useDealsEditorDrawer = ({
  openDrawer,
  setOpenDrawer,
  companyId,
  dealRecord,
}: any) => {
  const [searchProduct, setSearchProduct] = useState('');
  const [postDeals] = usePostDealsMutation();
  const [createAssociationDeals] = useCreateAssociationMutation();
  const [updatedAssignDeal] = usePatchDealsMutation();

  const methodsProducts = useForm({
    resolver: yupResolver(productsValidationSchema),
    defaultValues: async () => {
      if (dealRecord) {
        const {
          name,
          dealPiplineId,
          dealStageId,
          amount,
          closeDate,
          ownerId,
          priority,
          addLineItemId,
        } = dealRecord;
        return {
          name,
          dealPiplineId,
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

  const { handleSubmit, watch, reset } = methodsProducts;
  const watchProductstatus = watch(['dealStatus']);

  const onSubmit = async (values: any) => {
    delete values?.dealStatus;
    values.closeDate = dayjs(values?.closeDate)?.format(DATE_FORMAT?.API);

    try {
      let res: any;
      openDrawer === 'Edit'
        ? await updatedAssignDeal({
            id: dealRecord?._id,
            body: values,
          }).unwrap()
        : (res = await postDeals({ body: values })?.unwrap());

      if (res?.data) {
        try {
          await createAssociationDeals({
            body: {
              dealId: res?.data?._id,
              companyId: companyId?.companyId,
            },
          }).unwrap();

          enqueueSnackbar('Deal Added successfully', {
            variant: NOTISTACK_VARIANTS?.SUCCESS,
          });
          setOpenDrawer('');
          reset();
        } catch (error: any) {
          const errMsg = error?.data?.message;
          enqueueSnackbar(errMsg ?? 'Error occurred', { variant: 'error' });
        }
      }
      setOpenDrawer('');
      reset();
    } catch (error) {
      enqueueSnackbar('somthing went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    handleSubmit,
    onSubmit,
    methodsProducts,
    watchProductstatus,
    searchProduct,
    setSearchProduct,
  };
};

export default useDealsEditorDrawer;
