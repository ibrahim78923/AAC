import { useForm } from 'react-hook-form';

import { useTheme } from '@mui/material';

import { detailsDefaultValues, detailsValidationSchema } from './Details.data';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  useGetDealsActionPreviewQuery,
  usePatchDealsMutation,
} from '@/services/airSales/deals';
import { useEffect, useState } from 'react';
import { useGetCompanyContactsQuery } from '@/services/common-APIs';
import { getSession } from '@/utils';
import { PAGINATION } from '@/config';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useDetails = ({ selected }: any) => {
  const theme = useTheme();
  const { user }: any = getSession();
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);

  const { data, isLoading } = useGetDealsActionPreviewQuery({ id: selected });

  const contactParams = {
    page: page,
    limit: pageLimit,
    contactOwnerId: user?._id,
  };
  const { data: getDealOwnerContacts } =
    useGetCompanyContactsQuery(contactParams);

  const [patchDeals, { isLoading: updateLoading }] = usePatchDealsMutation();

  const methodsDetails = useForm({
    resolver: yupResolver(detailsValidationSchema),
    defaultValues: detailsDefaultValues,
  });
  const { handleSubmit, reset, watch }: any = methodsDetails;

  const dealPiplineId = watch('dealPiplineId');

  useEffect(() => {
    const fieldsData = data?.data;
    reset({
      name: fieldsData?.name,
      amount: fieldsData?.amount,
      ownerId: fieldsData?.ownerId,
      priority: fieldsData?.priority,
      dealStageId: fieldsData?.dealStageId,
      type: fieldsData?.type,
      contactMode: fieldsData?.contactMode,
      contactedPersonId: fieldsData?.contactedPersonId,
      dealPiplineId: fieldsData?.dealPiplineId,
      updatedAt: new Date(fieldsData?.updatedAt),
      createdAt: new Date(fieldsData?.createdAt),
      closeDate: new Date(fieldsData?.closeDate),
    });
  }, [data]);

  const onSubmit = async (values: any) => {
    try {
      delete values?.createdAt;
      delete values?.updatedAt;
      await patchDeals({ id: selected, body: values });
      enqueueSnackbar('Deal updated successfully.', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    theme,
    methodsDetails,
    onSubmit,
    handleSubmit,
    isLoading,
    dealPiplineId,
    getDealOwnerContacts,
    updateLoading,
    setPage,
    setPageLimit,
  };
};

export default useDetails;
