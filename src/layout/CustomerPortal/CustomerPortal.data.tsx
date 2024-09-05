import {
  CustomerCatalogIcon,
  CustomerDashboardIcon,
  CustomerKnowledgeBaseIcon,
  CustomerTicketsIcon,
} from '@/assets/icons';

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
      permissions?.includes('service-customer-view-KB-to-everyone') || user,
  },
  {
    key: '/air-customer-portal/catalog',
    icon: CustomerCatalogIcon,
    label: 'Catalog',
    role: 'CUSTOMER_PORTAL',
    permissions: user,
  },
];
