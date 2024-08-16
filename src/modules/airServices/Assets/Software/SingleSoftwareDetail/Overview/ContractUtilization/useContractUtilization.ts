import { useGetAssetsSoftwareContractUtilizationQuery } from '@/services/airServices/assets/software/single-software-detail/overview';
import { useTheme } from '@mui/material';
import { useDrawingArea } from '@mui/x-charts';
import { useSearchParams } from 'next/navigation';
import { ContractUtilizationI } from './ContractUtilization.interface';
import { ARRAY_INDEX } from '@/constants/strings';

export const useContractUtilization = (props: ContractUtilizationI) => {
  const { contractUtilizationData, contractUtilizationLabel } = props;
  const theme = useTheme();
  const { width, height, left, top } = useDrawingArea();
  const searchParams = useSearchParams();
  const softwareId = searchParams?.get('softwareId');
  const { data, isLoading, isError, isFetching } =
    useGetAssetsSoftwareContractUtilizationQuery(softwareId, {
      refetchOnMountOrArgChange: true,
      skip: !!!softwareId,
    });

  const transformDataIfAllZero = (contractUtilizationData: any) => {
    const inActiveUsers = data?.data?.[ARRAY_INDEX?.ZERO]?.inActiveUsers;
    const inActiveContracts =
      data?.data?.[ARRAY_INDEX?.ZERO]?.inActiveContracts;
    const transformableData = {
      inActiveContracts: inActiveContracts,
      inActiveUsers: inActiveUsers,
    };
    const allZero = Object?.values(transformableData)?.every(
      (value) => value === 0,
    );
    return allZero
      ? contractUtilizationData?.map(
          (
            item: {
              textLabel: string;
              heading: string;
            },
            index: number,
          ) => ({
            ...item,
            value: index === 0 ? 1e-10 : 1e-10,
          }),
        )
      : contractUtilizationData?.map(
          (
            item: {
              textLabel: string;
              heading: string;
            },
            index: number,
          ) => ({
            ...item,
            value: index === 0 ? inActiveUsers : inActiveContracts,
          }),
        );
  };
  return {
    contractUtilizationData,
    theme,
    contractUtilizationLabel,
    isLoading,
    isError,
    data,
    transformDataIfAllZero,
    width,
    height,
    left,
    top,
    isFetching,
  };
};
