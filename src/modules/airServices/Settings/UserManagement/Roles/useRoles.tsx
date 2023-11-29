import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';

export const useRoles = () => {
  const router = useRouter();

  const addNewRole = () => {
    router?.push(AIR_SERVICES?.USER_ADD_NEW_ROLES_SETTINGS);
  };

  return { addNewRole };
};
