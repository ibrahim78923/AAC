import { useRouter } from 'next/router';

export const useSalesReports = () => {
  const router = useRouter();
  return {
    router,
  };
};
