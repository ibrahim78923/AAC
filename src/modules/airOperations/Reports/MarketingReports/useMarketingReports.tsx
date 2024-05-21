import { useRouter } from 'next/router';

export const useMarketingReports = () => {
  const router = useRouter();
  return {
    router,
  };
};
