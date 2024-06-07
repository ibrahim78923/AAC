import { useRouter } from 'next/router';

export default function useUpsertMarketingReports() {
  const router: any = useRouter();

  return {
    router,
  };
}
