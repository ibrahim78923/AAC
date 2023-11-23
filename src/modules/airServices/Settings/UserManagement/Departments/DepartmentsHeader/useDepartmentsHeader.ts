import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';

export const useDepartmentsHeader = () => {
  const { SETTINGS_USER_MANAGEMENT } = AIR_SERVICES;
  const { push } = useRouter();
  const backArrowClick = () => {
    push({ pathname: SETTINGS_USER_MANAGEMENT });
  };
  return {
    backArrowClick,
  };
};
