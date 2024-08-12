import { SOCIAL_COMPONENTS } from '@/constants';
import { useRouter } from 'next/router';
import { templateDropdownFunction } from './EmailTemplate.data';
import { useGetMeetingsEmailTemplatesQuery } from '@/services/commonFeatures/meetings';

export const useEmilTemplate = () => {
  const router = useRouter();
  const handleMoveCreateEmail = () => {
    router?.push(SOCIAL_COMPONENTS?.CREATE_MEETING_TEMPLATE);
  };
  const handleMoveBackMeeting = () => {
    router?.back();
  };
  const dropdownOptions = templateDropdownFunction();
  const { data, isLoading, isFetching }: any =
    useGetMeetingsEmailTemplatesQuery(null);
  const meetingsEmailData = data?.data;

  return {
    router,
    handleMoveBackMeeting,
    handleMoveCreateEmail,
    dropdownOptions,
    meetingsEmailData,
    isLoading,
    isFetching,
  };
};
