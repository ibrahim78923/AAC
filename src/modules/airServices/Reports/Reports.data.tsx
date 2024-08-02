import { AIR_SERVICES } from '@/constants';
import {
  ContractReportsIcon,
  InventoryReportsIcon,
  PurchaseOrderReportsIcon,
  SoftwareReportsIcon,
  TicketsReportsIcon,
} from '@/assets/icons';
import { Permissions } from '@/constants/permissions';
import { ServicesReportsTypesI } from './Reports.interface';

export const reportsTypes: ServicesReportsTypesI[] = [
  {
    id: 1,
    avatar: TicketsReportsIcon,
    type: 'Tickets',
    purpose: `Overview Ticket Report`,
    link: AIR_SERVICES?.TICKETS_REPORTS,
    permissions: Permissions?.AIR_SERVICES_REPORTS_TICKETS,
  },
  {
    id: 2,
    avatar: InventoryReportsIcon,
    type: 'Inventory',
    purpose: `Overview Inventory Report`,
    link: AIR_SERVICES?.INVENTORY_REPORTS,
    permissions: Permissions?.AIR_SERVICES_REPORTS_INVENTORY,
  },
  {
    id: 3,
    avatar: SoftwareReportsIcon,
    type: 'Software',
    purpose: `Overview Software Report`,
    link: AIR_SERVICES?.SOFTWARE_REPORTS,
    permissions: Permissions?.AIR_SERVICES_REPORTS_SOFTWARE,
  },
  {
    id: 4,
    avatar: PurchaseOrderReportsIcon,
    type: 'Purchase Order',
    purpose: `Overview Purchase Order Report`,
    link: AIR_SERVICES?.PURCHASE_ORDER_REPORTS,
    permissions: Permissions?.AIR_SERVICES_REPORTS_PURCHASE_ORDER,
  },
  {
    id: 5,
    avatar: ContractReportsIcon,
    type: 'Contract',
    purpose: `Overview Contract Report`,
    link: AIR_SERVICES?.CONTRACTS_REPORTS,
    permissions: Permissions?.AIR_SERVICES_REPORTS_CONTRACT,
  },
];
