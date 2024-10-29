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
import { useRouter } from 'next/router';

const useDetails = () => {
  const router = useRouter();
  const { id: selecetdDealId } = router.query;
  const theme = useTheme();
  const { user }: any = getSession();
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);

  const contactParams = {
    page: page,
    limit: pageLimit,
    contactOwnerId: user?._id,
  };

  const { data: getDealOwnerContacts } =
    useGetCompanyContactsQuery(contactParams);
  const { data, isLoading: getDetailsLoading } = useGetDealsActionPreviewQuery(
    { id: selecetdDealId },
    { skip: !selecetdDealId },
  );
  const [patchDeals, { isLoading: updateLoading }] = usePatchDealsMutation();

  const methodsDetails = useForm({
    resolver: yupResolver(detailsValidationSchema),
    defaultValues: detailsDefaultValues,
  });
  const { handleSubmit, setValue, watch }: any = methodsDetails;

  const dealPipelineId = watch('dealPipelineId');
  useEffect(() => {
    const fieldsData = data?.data;
    const fieldsToSet: any = {
      name: fieldsData?.name,
      amount: fieldsData?.amount,
      ownerId: fieldsData?.dealOwner ?? null,
      priority: fieldsData?.priority,
      dealStageId: fieldsData?.dealStageId,
      type: fieldsData?.type,
      contactMode: fieldsData?.contactMode,
      contactedPersonId: fieldsData?.contactedPersonId,
      dealPipelineId: fieldsData?.dealPipelineObject,
      updatedAt: fieldsData?.updatedAt ? new Date(fieldsData?.updatedAt) : null,
      createdAt: fieldsData?.createdAt ? new Date(fieldsData?.createdAt) : null,
      closeDate: fieldsData?.closeDate ? new Date(fieldsData?.closeDate) : null,
    };
    for (const key in fieldsToSet) {
      setValue(key, fieldsToSet[key]);
    }
  }, [data]);

  const onSubmit = async (values: any) => {
    values.ownerId = values?.ownerId?._id;
    values.dealPipelineId = values?.dealPipelineId?._id;
    delete values?.createdDate;
    delete values?.createdAt;
    delete values?.updatedAt;
    delete values?.lastActivity;
    try {
      await patchDeals({ id: selecetdDealId, body: values })?.unwrap();
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
    dealPipelineId,
    getDealOwnerContacts,
    updateLoading,
    setPage,
    setPageLimit,
    getDetailsLoading,
  };
};

export default useDetails;
