import { useRouter } from 'next/router';

export default function useUpsertSalesReports() {
  const router: any = useRouter();

  return {
    router,
  };
}
