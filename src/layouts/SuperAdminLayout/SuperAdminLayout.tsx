import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import Toolbar from '@mui/material/Toolbar';

import Logo from '../../assets/images/shared/Logo.png';
import DashboardIcon from '../../assets/images/shared/dashboard.png';
import UserManagementIcon from '../../assets/images/shared/user-management.png';
import PlanManagementIcon from '../../assets/images/shared/plan-management.png';
import BillingInvoiceIcon from '../../assets/images/shared/billing-invoices.png';

import ReportsIcon from '../../assets/images/shared/reports.png';
import Image from 'next/image';
import Link from 'next/link';
import Header from './Header';
import { uuid } from 'uuidv4';

const drawerWidth = 220;

interface Props {
  window?: () => Window;
  children: React.ReactNode;
}

type MenuItem = {
  key: React.Key;
  icon?: any;
  label: React.ReactNode;
  type?: 'group';
  children?: {
    key: React.Key;
    label: React.ReactNode;
  }[];
};

const items: MenuItem[] = [
  {
    key: 'super-admin-dashboard',
    icon: DashboardIcon,
    label: 'Dashboard',
  },
  {
    key: 'super-admin-user-management',
    icon: UserManagementIcon,
    label: 'User Management',
  },
  {
    key: 'super-admin-plan-management',
    icon: PlanManagementIcon,
    label: 'Plan Management',
  },
  {
    key: 'super-admin-billing-invoices',
    icon: BillingInvoiceIcon,
    label: 'Billing & Invoices',
  },
  {
    key: 'super-admin-reports',
    icon: ReportsIcon,
    label: 'Reports',
  },
];

export default function SuperAdminLayout(props: Props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Box sx={{ p: 2 }}>
        <Image src={Logo} alt="logo" />
      </Box>

      {items.map((link) => (
        <Link key={uuid()} href={`${link.key}`}>
          <ListItem key={link.key} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Image src={link.icon} alt={link.icon} />
              </ListItemIcon>

              {link.label}
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: '#FFF',
          boxShadow: 'none',
          color: 'black',
          p: '18px 24px',
        }}
      >
        <Header handleDrawerToggle={handleDrawerToggle} />
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          background: '#F7F9FB',
          height: 'calc(100vh)',
          padding: '24px',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Box
          sx={{
            background: '#FFF',
            minHeight: `calc(100% - ${70}px)`,
            height: 'auto',
            padding: '24px',
            borderRadius: '8px',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
