import { useGetAssetsSoftwareContractUtilizationQuery } from '@/services/airServices/assets/software/single-software-detail/overview';
import { useTheme } from '@mui/material';
import { useDrawingArea } from '@mui/x-charts';
import { useSearchParams } from 'next/navigation';

export const useContractUtilization = (props: any) => {
  const { contractUtilizationData, contractUtilizationLabel } = props;
  const theme: any = useTheme();
  const { width, height, left, top } = useDrawingArea();
  const searchParams = useSearchParams();
  const softwareId = searchParams.get('softwareId');
  const { data, isLoading, isError } =
    useGetAssetsSoftwareContractUtilizationQuery(softwareId);
  const transformDataIfAllZero = (contractUtilizationData: any) => {
    const inActiveUsers = data?.data?.[0]?.inActiveUsers;
    const inActiveContracts = data?.data?.[0]?.inActiveContracts;
    const transformableData = {
      inActiveContracts: inActiveContracts,
      inActiveUsers: inActiveUsers,
    };
    const allZero = Object.values(transformableData).every(
      (value) => value === 0,
    );
    return allZero
      ? contractUtilizationData?.map((item: any, index: any) => ({
          ...item,
          value: index === 0 ? 1e-10 : 1e-10,
        }))
      : contractUtilizationData?.map((item: any, index: any) => ({
          ...item,
          value: index === 0 ? inActiveUsers : inActiveContracts,
        }));
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
  };
};
