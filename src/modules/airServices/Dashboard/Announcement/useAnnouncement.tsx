import { useState } from 'react';
import AddAnnouncement from './AddAnnouncement';
import { AnnouncementList } from './AnnouncementList';

export const useAnnouncement = () => {
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});

  const portalComponentProps = {
    isPortalOpen: isPortalOpen,
    setIsPortalOpen: setIsPortalOpen,
  };

  const renderPortalComponent = () => {
    if (isPortalOpen?.isAdd) {
      return <AddAnnouncement {...portalComponentProps} />;
    }
    if (isPortalOpen?.isView) {
      return <AnnouncementList {...portalComponentProps} />;
    }
    return <></>;
  };

  return {
    renderPortalComponent,
    isPortalOpen,
    setIsPortalOpen,
  };
};
