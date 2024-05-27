import { useRouter } from 'next/router';

export const useServicesReports = () => {
  const router = useRouter();
  return {
    router,
  };
};
