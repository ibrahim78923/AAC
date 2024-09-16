import {
  CustomerDashboardIcon,
  CustomerTicketsIcon,
  CustomerKnowledgeBaseIcon,
  CustomerCatalogIcon,
} from '@/assets/icons';
import { INavbarDataArrayItem } from '../CustomizePortal.interface';

export const NavbarDataArray: INavbarDataArrayItem[] = [
  { id: 1, title: 'Dashboard', icon: CustomerDashboardIcon },
  { id: 2, title: 'Tickets', icon: CustomerTicketsIcon },
  { id: 3, title: 'Knowledge Base', icon: CustomerKnowledgeBaseIcon },
  { id: 4, title: 'Catalog', icon: CustomerCatalogIcon },
];
