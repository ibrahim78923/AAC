import { useGetBusinessHourQuery } from '@/services/airServices/settings/service-management/business-hours';
import { useRouter } from 'next/router';
export const useBusinessHour = () => {
  const router = useRouter();
  const { data, isLoading } = useGetBusinessHourQuery();
  const businessHoursList = data?.data;
  return {
    router,
    businessHoursList,
    isLoading,
  };
};
