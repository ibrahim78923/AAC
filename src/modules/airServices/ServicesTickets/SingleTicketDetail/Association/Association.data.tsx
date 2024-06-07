import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';

export const drawerInitialState = {
  asset: false,
  deal: false,
  contact: false,
  company: false,
};

export const getDropdownOptions = ({ setIsDrawerOpen }: any) => [
  {
    id: 1,
    title: 'Assets',
    permissionKey: [AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_ASSOCIATE_ASSETS],
    handleClick: (close: any) => {
      setIsDrawerOpen({
        asset: true,
        deal: false,
        contact: false,
        company: false,
      });
      close?.();
    },
  },
  {
    id: 2,
    title: 'Deals',
    permissionKey: [AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_ASSOCIATE_ASSETS],
    handleClick: (close: any) => {
      setIsDrawerOpen({
        asset: false,
        deal: true,
        contact: false,
        company: false,
      });
      close?.();
    },
  },
  {
    id: 3,
    title: 'Contacts',
    permissionKey: [AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_ASSOCIATE_ASSETS],
    handleClick: (close: any) => {
      setIsDrawerOpen({
        asset: false,
        deal: false,
        contact: true,
        company: false,
      });
      close?.();
    },
  },
  {
    id: 4,
    title: 'Companies',
    permissionKey: [AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_ASSOCIATE_ASSETS],
    handleClick: (close: any) => {
      setIsDrawerOpen({
        asset: false,
        deal: false,
        contact: false,
        company: true,
      });
      close?.();
    },
  },
];
