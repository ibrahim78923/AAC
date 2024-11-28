import { AIR_SERVICES } from '@/constants/routes';
import { AIR_SALES } from '@/routesConstants/paths';
import { useRouter } from 'next/router';

export const useScheduleMeetings = () => {
  const router = useRouter();
  const moduleId = router?.query?.moduleId;
  const moduleType: any = router?.query?.moduleType;

  const modules: any = (id: string) => ({
    TICKET: `${AIR_SERVICES?.TICKETS_LIST}?ticketId=${id}`,
    DEALS: `${AIR_SALES?.VIEW_DETAILS}?id=${id}`,
  });
  return {
    moduleId,
    moduleType,
    modules,
    router,
  };
};
