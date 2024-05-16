import { AIR_SERVICES } from '@/constants';
import {
  ContractReportsIcon,
  InventoryReportsIcon,
  PurchaseOrderReportsIcon,
  SoftwareReportsIcon,
  TicketsReportsIcon,
} from '@/assets/icons';

export const reportsTypes = [
  {
    id: 1,
    avatar: TicketsReportsIcon,
    type: 'Tickets',
    purpose: `Overview Ticket Report`,
    link: AIR_SERVICES?.TICKETS_REPORTS,
  },
  {
    id: 2,
    avatar: InventoryReportsIcon,
    type: 'Inventory',
    purpose: `Overview Ticket Report`,
    link: AIR_SERVICES?.INVENTORY_REPORTS,
  },
  {
    id: 3,
    avatar: SoftwareReportsIcon,
    type: 'Software',
    purpose: `Overview Inventory Report`,
    link: AIR_SERVICES?.SOFTWARE_REPORTS,
  },
  {
    id: 4,
    avatar: PurchaseOrderReportsIcon,
    type: 'Purchase Order',
    purpose: `Overview Software Report`,
    link: AIR_SERVICES?.PURCHASE_ORDER_REPORTS,
  },
  {
    id: 5,
    avatar: ContractReportsIcon,
    type: 'Contract',
    purpose: `Overview Ticket Report`,
    link: AIR_SERVICES?.CONTRACTS_REPORTS,
  },
];
