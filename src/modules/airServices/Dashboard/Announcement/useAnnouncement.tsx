import { useState } from 'react';
import { UpsertAnnouncement } from './UpsertAnnouncement';
import { AnnouncementList } from './AnnouncementList';
import { dropdownAnnouncementsOptionsDynamic } from './Announcement.data';
import { DeleteAnnouncement } from './DeleteAnnouncement';
import { useLazyGetSingleAnnouncementOnDashboardQuery } from '@/services/airServices/dashboard';
import {
  AnnouncementIsPortalOpenPropsI,
  AnnouncementPortalComponentsPropsI,
} from './Announcement.interface';
import { SingleDashboardComponentPropsI } from '../SingleDashboard/SingleDashboard.interface';

export const useAnnouncement = (props: SingleDashboardComponentPropsI) => {
  const { data, getSingleDashboardData } = props;
  const [isPortalOpen, setIsPortalOpen] =
    useState<AnnouncementIsPortalOpenPropsI>({});

  const [
    lazyGetCustomerAnnouncementTrigger,
    lazyGetCustomerAnnouncementStatus,
  ] = useLazyGetSingleAnnouncementOnDashboardQuery();

  const getCustomerAnnouncementData = async () => {
    try {
      await lazyGetCustomerAnnouncementTrigger(null)?.unwrap();
    } catch (error: any) {}
  };

  const dropdownAnnouncementsOptions = (dropdownData: any) =>
    dropdownAnnouncementsOptionsDynamic?.(setIsPortalOpen, dropdownData);

  const portalComponentProps: AnnouncementPortalComponentsPropsI = {
    isPortalOpen: isPortalOpen,
    setIsPortalOpen: setIsPortalOpen,
    dropdownAnnouncementsOptions,
    lazyGetCustomerAnnouncementStatus,
    getCustomerAnnouncementData,
    data,
    getSingleDashboardData,
  };

  const renderPortalComponent = () => {
    if (isPortalOpen?.isUpsert) {
      return <UpsertAnnouncement {...portalComponentProps} />;
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
