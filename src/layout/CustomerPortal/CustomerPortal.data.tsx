import {
  CustomerCatalogIcon,
  CustomerDashboardIcon,
  CustomerKnowledgeBaseIcon,
  CustomerTicketsIcon,
} from '@/assets/icons';
import { AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS } from '@/constants/permission-keys';

export const drawerWidth = 230;

export const getCustomerPortalRoutes = (user: any, permissions: string[]) => [
  {
    key: '/air-customer-portal',
    icon: CustomerDashboardIcon,
    label: 'Dashboard',
    role: 'CUSTOMER_PORTAL',
    permissions: true,
  },
  {
    key: '/air-customer-portal/tickets',
    icon: CustomerTicketsIcon,
    label: 'Tickets',
    role: 'CUSTOMER_PORTAL',
    permissions: user,
  },
  {
    key: '/air-customer-portal/knowledge-base',
    icon: CustomerKnowledgeBaseIcon,
    label: 'Knowledge Base',
    role: 'CUSTOMER_PORTAL',
    permissions:
      permissions?.includes(
        AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_VIEW_KB_TO_EVERYONE,
      ) || user,
  },
  {
    key: '/air-customer-portal/catalog',
    icon: CustomerCatalogIcon,
    label: 'Catalog',
    role: 'CUSTOMER_PORTAL',
    permissions: user,
  },
];
