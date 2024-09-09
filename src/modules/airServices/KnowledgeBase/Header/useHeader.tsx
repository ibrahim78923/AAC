import { useAppDispatch, useAppSelector } from '@/redux/store';
import { createNewKnowledgeBaseDropdownOptionsDynamic } from './Header.data';
import { setIsPortalOpen } from '@/redux/slices/airServices/knowledge-base/slice';
import { useRouter } from 'next/router';

export const useHeader = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isPortalOpen = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.isPortalOpen,
  );

  const setPortalAction = (actionType: any) => {
    dispatch(
      setIsPortalOpen<any>({
        isOpen: true,
        action: actionType,
      }),
    );
  };

  const createNewKnowledgeBaseDropdownOptions =
    createNewKnowledgeBaseDropdownOptionsDynamic?.(setPortalAction, router);

  return {
    createNewKnowledgeBaseDropdownOptions,
    isPortalOpen,
  };
};
