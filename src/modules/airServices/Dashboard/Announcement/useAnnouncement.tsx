import { useState } from 'react';
import { dropdownAnnouncementsOptionsDynamic } from './Announcement.data';
import {
  AnnouncementIsPortalOpenPropsI,
  AnnouncementPortalComponentsPropsI,
} from './Announcement.interface';
import { SingleDashboardComponentPropsI } from '../SingleDashboard/SingleDashboard.interface';
import { useLazyGetServicesDashboardAnnouncementsListQuery } from '@/services/airServices/dashboard';
import LazyLoadingFlow from '@/components/LazyLoadingFlow';
import dynamic from 'next/dynamic';

const UpsertAnnouncement = dynamic(() => import('./UpsertAnnouncement'), {
  ssr: false,
  loading: (options: any) => (
    <LazyLoadingFlow
      name="upsert announcements"
      isLoading={options?.isLoading}
      error={options?.error}
    />
  ),
});

const AnnouncementList = dynamic(() => import('./AnnouncementList'), {
  ssr: false,
  loading: (options: any) => (
    <LazyLoadingFlow
      name="announcement lists"
      isLoading={options?.isLoading}
      error={options?.error}
    />
  ),
});

const DeleteAnnouncement = dynamic(() => import('./DeleteAnnouncement'), {
  ssr: false,
  loading: (options: any) => (
    <LazyLoadingFlow
      name="delete announcement"
      isLoading={options?.isLoading}
      error={options?.error}
    />
  ),
});

export const useAnnouncement = (props: SingleDashboardComponentPropsI) => {
  const { data, getSingleDashboardData } = props;
  const [isPortalOpen, setIsPortalOpen] =
    useState<AnnouncementIsPortalOpenPropsI>({});

  const [
    lazyGetCustomerAnnouncementTrigger,
    lazyGetCustomerAnnouncementStatus,
  ] = useLazyGetServicesDashboardAnnouncementsListQuery();

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
