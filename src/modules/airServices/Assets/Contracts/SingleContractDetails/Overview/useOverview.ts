import { useGetContractsOverviewQuery } from '@/services/airServices/assets/contracts/single-contract-details/overview';
import { useTheme } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { overviewDataArray } from './Overview.data';

export const useOverview = () => {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const contractId = searchParams?.get('contractId');

  const { data, isLoading, isFetching, isError } = useGetContractsOverviewQuery(
    contractId,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!contractId,
    },
  );
  const contractData = data?.data;
  const contractItemDataArray = !!data?.data?.itemsDetail?.length
    ? data?.data?.itemsDetail
    : [];

  const contractItemData = contractItemDataArray?.find((item: any) => ({
    serviceName: item?.serviceName,
    priceModel: item?.priceModel,
    cost: item?.cost,
    count: item?.count,
    comments: item?.comments,
    _id: item?._id,
  }));

  const approverName = data?.data?.approver;

  const fieldsOverviewData = overviewDataArray(data?.data);

  return {
    theme,
    contractData,
    contractItemData,
    approverName,
    isLoading,
    isFetching,
    isError,
    fieldsOverviewData,
    data,
  };
};
