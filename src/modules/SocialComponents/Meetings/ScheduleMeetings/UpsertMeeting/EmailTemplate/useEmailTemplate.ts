import { SOCIAL_COMPONENTS } from '@/constants';
import { useRouter } from 'next/router';
import { templateDropdownFunction } from './EmailTemplate.data';

export const useEmilTemplate = () => {
  const router = useRouter();
  const handleMoveCreateEmail = () => {
    router?.push(SOCIAL_COMPONENTS?.CREATE_MEETING_TEMPLATE);
  };
  const handleMoveBackMeeting = () => {
    router?.back();
  };
  const dropdownOptions = templateDropdownFunction();
  return {
    router,
    handleMoveBackMeeting,
    handleMoveCreateEmail,
    dropdownOptions,
  };
};
