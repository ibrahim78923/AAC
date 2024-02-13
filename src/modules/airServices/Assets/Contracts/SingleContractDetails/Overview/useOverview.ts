import { useGetContractsOverviewQuery } from '@/services/airServices/assets/contracts/single-contract-details/overview';
import { useTheme } from '@mui/material';
import { useSearchParams } from 'next/navigation';

export const useOverview = () => {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const contractId = searchParams?.get('contractId');
  const { data } = useGetContractsOverviewQuery(contractId);
  const contractData = data?.data?.contractResponse;
  const contractItemDataArray = data?.data?.contractResponse?.itemsDetail || [];
  const contractItemData = contractItemDataArray.map((item: any) => ({
    serviceName: item?.serviceName,
    priceModel: item?.priceModel,
    cost: item?.cost,
    count: item?.count,
    comments: item?.comments,
    _id: item?._id,
  }));
  return {
    theme,
    contractData,
    contractItemData,
  };
};
