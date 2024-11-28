import {
  CustomerCatalogIcon,
  CustomerDashboardIcon,
  CustomerKnowledgeBaseIcon,
  CustomerTicketsIcon,
} from '@/assets/icons';
import { AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS } from '@/constants/permission-keys';
import { AIR_CUSTOMER_PORTAL } from '@/constants/routes';

export const drawerWidth = 230;

export const customizePortalDefaultValues = (theme?: any) => ({
  btnPrimary: theme?.palette?.primary?.main,
  btnSecondary: theme?.palette?.secondary?.main,
  sideMenu: theme?.palette?.common?.white,
  iconPrimary: theme?.palette?.secondary?.main,
  iconSecondary: theme?.palette?.common?.white,
});

export const getCustomerPortalRoutes = (user: any, permissions: string[]) => [
  {
    key: AIR_CUSTOMER_PORTAL?.DASHBOARD,
    icon: CustomerDashboardIcon,
    label: 'Dashboard',
    role: 'CUSTOMER_PORTAL',
    permissions: true,
  },
  {
    key: AIR_CUSTOMER_PORTAL?.TICKETS,
    icon: CustomerTicketsIcon,
    label: 'Tickets',
    role: 'CUSTOMER_PORTAL',
    permissions: user,
  },
  {
    key: AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE,
    icon: CustomerKnowledgeBaseIcon,
    label: 'Knowledge Base',
    role: 'CUSTOMER_PORTAL',
    permissions:
      permissions?.includes(
        AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_VIEW_KB_TO_EVERYONE,
      ) || user,
  },
  {
    key: AIR_CUSTOMER_PORTAL?.CATALOG_SERVICES,
    icon: CustomerCatalogIcon,
    label: 'Catalog',
    role: 'CUSTOMER_PORTAL',
    permissions: user,
  },
];
