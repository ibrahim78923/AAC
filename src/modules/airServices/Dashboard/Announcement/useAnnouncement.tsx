import { useState } from 'react';
import AddAnnouncement from './AddAnnouncement';
import { AnnouncementList } from './AnnouncementList';
import { dropdownAnnouncementsOptionsDynamic } from './Announcement.data';
import { DeleteAnnouncement } from './DeleteAnnouncement';
import { useLazyGetCustomerAnnouncementQuery } from '@/services/airServices/dashboard';
import { PAGINATION } from '@/config';

export const useAnnouncement = () => {
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const [
    lazyGetCustomerAnnouncementTrigger,
    lazyGetCustomerAnnouncementStatus,
  ] = useLazyGetCustomerAnnouncementQuery();

  const getCustomerAnnouncementData = async (currentPage = page) => {
    const getCustomerAnnouncementApiParameter = {
      page: currentPage,
      limit: pageLimit,
    };

    const apiDataParameter = {
      queryParams: getCustomerAnnouncementApiParameter,
    };

    try {
      await lazyGetCustomerAnnouncementTrigger(apiDataParameter)?.unwrap();
    } catch (error: any) {}
  };

  const dropdownAnnouncementsOptions = (data: any) =>
    dropdownAnnouncementsOptionsDynamic?.(setIsPortalOpen, data);

  const portalComponentProps = {
    isPortalOpen: isPortalOpen,
    setIsPortalOpen: setIsPortalOpen,
    dropdownAnnouncementsOptions,
    lazyGetCustomerAnnouncementStatus,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    getCustomerAnnouncementData,
  };

  const renderPortalComponent = () => {
    if (isPortalOpen?.isUpsert) {
      return <AddAnnouncement {...portalComponentProps} />;
    }
    if (isPortalOpen?.isView) {
      return <AnnouncementList {...portalComponentProps} />;
    }
    if (isPortalOpen?.isDelete) {
      return <DeleteAnnouncement {...portalComponentProps} />;
    }
    return <></>;
  };

  return {
    renderPortalComponent,
    isPortalOpen,
    setIsPortalOpen,
  };
};
