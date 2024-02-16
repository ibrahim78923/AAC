import { AIR_SERVICES } from '@/constants';
import { Box, Button } from '@mui/material';

export const dropDownMenus =(setIsDrawerOpen:any)=> [
  {
    title: 'Copy URL',
    handleClick:(closeMenu:any)=>{
      closeMenu?.();
    }
  },
  {
    title: 'Email this dashboard',
    handleClick:(closeMenu:any)=>{
      setIsDrawerOpen(true);
      closeMenu?.();
    }
  },
  {
    title: 'Edit',
    handleClick:(closeMenu:any)=>{
      closeMenu?.();
    }
  },
];

export const dashboardFunction = (theme: any, router: any) => [
  {
    title: (
      <Box display={'flex'} gap={'3rem'}>
        Services
        <Box
          sx={{
            color: theme?.palette?.success?.main,
            border: '1px solid',
            padding: '0 10px',
            borderRadius: '16px',
            cursor: 'pointer',
            width: 'fit-content',
          }}
        >
          open
        </Box>
      </Box>
    ),
    handleClick:(closeMenu:any)=>{
      closeMenu?.();
    }
  },
  {
    title: 'Services_1',
    handleClick:(closeMenu:any)=>{
      closeMenu?.();
    }
  },
  {
    title: 'Services_2',
    handleClick:(closeMenu:any)=>{
      closeMenu?.();
    }
  },
  {
    title: 'Services_3',
    handleClick:(closeMenu:any)=>{
      closeMenu?.();
    }
  },
  {
    title: 'Services_4',
    handleClick:(closeMenu:any)=>{
      closeMenu?.();
    }
  },
  {
    title: (
      <Button
        sx={{
          border: `0.063rem solid ${theme?.palette?.grey?.[600]}`,
          color: theme?.palette?.grey?.[600],
        }}
        
        onClick={() => router?.push(AIR_SERVICES?.MANAGE_DASHBOARD)}
      >
        Manage Dashboards
      </Button>
    ),
  },
];
