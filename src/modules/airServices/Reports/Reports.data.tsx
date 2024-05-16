import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { AIR_SERVICES } from '@/constants';
import { ClosureRuleIcon, ServicesCatalogIcon } from '@/assets/icons';
export const reportsTypes = [
  {
    id: 1,
    avatar: ServicesCatalogIcon,
    type: 'Tickets',
    purpose: `Overview Ticket Report`,
    link: AIR_SERVICES?.TICKETS_REPORTS,
  },
  {
    id: 2,
    avatar: BusinessCenterIcon,
    type: 'Inventory',
    purpose: `Overview Ticket Report`,
    link: AIR_SERVICES?.INVENTORY_REPORTS,
  },
  {
    id: 3,
    avatar: ClosureRuleIcon,
    type: 'Software',
    purpose: `Overview Inventory Report`,
    link: AIR_SERVICES?.SOFTWARE_REPORTS,
  },
  {
    id: 4,
    avatar: BusinessCenterIcon,
    type: 'Purchase Order',
    purpose: `Overview Software Report`,
    link: AIR_SERVICES?.PURCHASE_ORDER_REPORTS,
  },
  {
    id: 5,
    avatar: ClosureRuleIcon,
    type: 'Contract',
    purpose: `Overview Ticket Report`,
    link: AIR_SERVICES?.CONTRACTS_REPORTS,
  },
];
