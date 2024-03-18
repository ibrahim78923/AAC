import { useGetContractsOverviewQuery } from '@/services/airServices/assets/contracts/single-contract-details/overview';
import { useTheme } from '@mui/material';
import { useSearchParams } from 'next/navigation';

export const useOverview = () => {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const contractId = searchParams?.get('contractId');
  const { data, isLoading, isFetching } =
    useGetContractsOverviewQuery(contractId);
  const contractData = data?.data;
  const contractItemDataArray = data?.data?.itemsDetail || [];
  const contractItemData = contractItemDataArray.find((item: any) => ({
    serviceName: item?.serviceName,
    priceModel: item?.priceModel,
    cost: item?.cost,
    count: item?.count,
    comments: item?.comments,
    _id: item?._id,
  }));
  const approverName = data?.data?.history?.find(
    (detail: any) => detail?.performedBy,
  )?.performedBy;

  return {
    theme,
    contractData,
    contractItemData,
    approverName,
    isLoading,
    isFetching,
  };
};
